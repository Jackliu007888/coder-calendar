// var today = new Date()

// export function is_someday() {
//   return today.getMonth() == 5 && today.getDate() == 4;
// }

export function star(num) {
  var i = num > 5 ? 5 : (num < 0 ? 0 : num)
  return '★★★★★☆☆☆☆☆'.slice(5 - parseInt(i)).slice(0, 5)
}

export function random(dayseed, indexseed) {
  var n = dayseed % 11117;
  for (var i = 0; i < 100 + indexseed; i++) {
    n = n * n;
    n = n % 11117; // 11117 是个质数
  }
  return n;
}

// 从数组中随机挑选 size 个
export function pickRandom(array, size, iday) {
  var result = [];

  for (var i = 0; i < array.length; i++) {
    result.push(array[i]);
  }

  for (var j = 0; j < array.length - size; j++) {
    var index = random(iday, j) % result.length;
    result.splice(index, 1);
  }
  return result;
}


export function pickRandomActivity(activities, size, iday) {
  var picked_events = pickRandom(activities, size, iday);

  for (var i = 0; i < picked_events.length; i++) {
    picked_events[i] = parse(picked_events[i], iday);
  }

  return picked_events;
}


function parse(event, iday) {
  var result = {
    name: event.name,
    good: event.good,
    bad: event.bad
  }; // clone

  if (result.name.indexOf('%v') != -1) {
    result.name = result.name.replace(
      '%v',
      varNames[random(iday, 12) % varNames.length]
    );
  }

  if (result.name.indexOf('%t') != -1) {
    result.name = result.name.replace(
      '%t',
      tools[random(iday, 11) % tools.length]
    );
  }

  if (result.name.indexOf('%l') != -1) {
    result.name = result.name.replace(
      '%l',
      (random(iday, 12) % 247 + 30).toString()
    );
  }

  return result;
}

export function filter(activities, iday) {
  var result = [];
  // 周末的话，只留下 weekend = true 的事件

  if (isWeekend(iday)) {
    for (var i = 0; i < activities.length; i++) {
      if (activities[i].weekend) {
        result.push(activities[i]);
      }
    }
    return result;
  }

  return activities;
}
function isWeekend(iday) {
  return (iday + 4) % 7 == 0 || (iday + 4) % 7 == 6;
}