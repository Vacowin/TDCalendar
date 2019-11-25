import React, {Component} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import _ from 'lodash';

import { layOutDay } from './EventManager'

class Calendar extends Component {
  state = {
    events: [
      {start:30, end:150}, 
		  {start:540, end: 600},
		  {start:560, end: 620},
			{start:610, end: 670},
    ]
  }

  componentDidMount() {
    let events = this.state.events;
		let newEvents = layOutDay(
			_.sortBy(events, event => event.start), 
			Dimensions.get('window').width - 70
		);

		this.setState({events: newEvents})
  }

  render() {
		return (
			<View style={styles.calendar}>
				{this.renderTimeView()}
				{this.renderContainerView()}
			</View>
		)
  }

  renderContainerView = () => {
    return (
      <View style={styles.container}>
				<View style={{width: Dimensions.get('window').width - 70, height: '100%'}}>
					{this.renderEvents(this.state.events)}
				</View>
      </View>
    );
	}

	renderTimeView = () => {
		let hours = [];
		for (i = 9*60; i <= 21*60; i+=30) {
			let h = Math.floor(i / 60);
			let m = i % 60;
			let a = 'am';
    	if (h >= 12) a = 'pm';
    	if (h > 12) {
				h = h - 12;
			}
			if (m != 0) a = '';
			hours.push(h + ':' + ((m==0)?'00':m )+ ' ' + a);
		}

		let times = hours.map((time, index) => {
			return <View style={{position: 'absolute',top: index * 30,}}>
				<Text style={index%2==0?{fontWeight: 'bold',fontSize:10}:{fontWeight: '100',fontSize:8}}>{time}</Text>
			</View>
		});

		return (
			<View style={styles.time}>
				{times}
			</View>
		)
	}

	renderEvents = (events) => {
		return events.map(event => {
			return (
				<View style={[styles.event, {
						top: event.start ,
						left: event.left ,
						width: event.width ,
						height: event.height
					}]}
				>
					<Text style={{fontWeight: 'bold', color: '#001e9c'}}>Sample Item</Text>
					<Text style={{fontSize: 8}}>Sample location</Text>
				</View>
			)
		})
	}
}

const styles = StyleSheet.create({
	calendar: {
		flex: 1,
		flexDirection: 'row',
		top: 10,
	},
  container: {
		width: Dimensions.get('window').width - 60,
		height: 720,
		backgroundColor: '#d6d6d6',
		paddingLeft: 5
	},
	time: {
		alignItems: 'flex-end',
		width: 50,
		marginRight: 5,
		top: -5
	},
	event: {
		borderLeftWidth: 3,
		borderLeftColor: '#001e9c',
		borderWidth: 0.5,
		backgroundColor: 'white',
		borderRadius: 3,
		overflow: 'hidden',
		padding: 5,
		position: 'absolute'
	}
});

export default Calendar;
