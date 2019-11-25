export const layOutDay = (events, MAXWIDTH) => {

  let TOTALMINUTES = (21 - 9) * 60;
  let minutes = [];
  for (i=0; i<TOTALMINUTES; i++) {
    minutes.push([]);
  }
  
  let eventMap = {};
  events.forEach((event, index) => {
    event.position = -1;
    event.shares = 0;
    event.height = event.end - event.start;
    event.id = index;
    
    eventMap[event.id] = event;

    for(i=event.start; i<event.end; i++) {
      minutes[i].push(event.id);
    }
  });

  let checkTimeCollision = (minute, pos, eventId) => {
    for (i=0; i<minute.length; ++i) {
      let event = eventMap[minute[i]];
      if (event.position == pos) {
        if (event.id != eventId) {
          return false; 
        } else {
          return true;
        }
      }
    }
    return true;
  }

  minutes.forEach(minute => {
    minute.forEach(eventId => {
      let event = eventMap[eventId];
      let max = minute.length;
      minute.forEach(id => {
        let otherEvent = eventMap[id];
        max=(otherEvent.shares>max)? otherEvent.shares: max;
      });

      if (event.shares <= max) {    
        event.shares = max;
      }

      if (event.position == -1) {
        let position = 0;
        while (! checkTimeCollision(minute, position, event.id)) {
          position++;
        }
        event.position = position;
      }
    })
  });

  minutes.forEach(minute => {
    minute.forEach(eventId => {
      let event = eventMap[eventId];
      let max = minute.length;
      minute.forEach(id => {
        let otherEvent = eventMap[id];
        max=(otherEvent.shares>max)? otherEvent.shares: max;
      });

      if (event.shares <= max) {    
        event.shares = max;
      }
    })
  });

  events.forEach(event => {
    event.left = Math.round(event.position * MAXWIDTH / event.shares);
    event.width = Math.round(MAXWIDTH /  event.shares);
  });
  //console.log(events)
  return events;
}