
// basic functionalities
function connectFunc(){
  console.log("Connecting..");
  // client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
  client = mqtt.connect(document.getElementById('broker').value)
  console.log(document.getElementById('broker').value);

  client.on("connect", function(){
    console.log("Successfully connected");
  })

  client.on("message", function (topic, payload) {
    // console.log([topic, payload].join(": "));
    console.log("Received { topic: " + topic + "; payload: " + payload + " }");
    let tbl = document.getElementById('receiver');
    let tbody = document.getElementById('msg');
     let tr = document.createElement('tr');
     let msgTopic = document.createElement('td');
     let msgPayload = document.createElement('td');
     let msgTime = document.createElement('td');
     msgTopic.appendChild(document.createTextNode(topic));
     msgPayload.appendChild(document.createTextNode(payload));
     msgTime.appendChild(document.createTextNode(moment().format('llll')));
     tr.appendChild(msgTopic);
     tr.appendChild(msgPayload);
     tr.appendChild(msgTime);
     tbody.appendChild(tr);
     tbl.appendChild(tbody);
    // client.end();
  })

}
function publishFunc(){
  // console.log("publish");
  // client.publish("mqtt/demo", "hello world!");
  client.publish(document.getElementById('pub-topic').value, document.getElementById('pub-payload').value)
  console.log("Published { topic: " + document.getElementById('pub-topic').value
  + "; payload: " + document.getElementById('pub-payload').value + " }");
  let tbl = document.getElementById('publisher');
  let tbody = document.getElementById('pubmsg');
  let tr = document.createElement('tr');
  let msgTopic = document.createElement('td');
  let msgPayload = document.createElement('td');
  let msgTime = document.createElement('td');
  msgTopic.appendChild(document.createTextNode(document.getElementById('pub-topic').value));
  msgPayload.appendChild(document.createTextNode(document.getElementById('pub-payload').value));
  msgTime.appendChild(document.createTextNode(moment().format('llll')));
  tr.appendChild(msgTopic);
  tr.appendChild(msgPayload);
  tr.appendChild(msgTime);
  tbody.appendChild(tr);
  tbl.appendChild(tbody);
  // console.log(document.getElementById('pub-topic').value);
  // console.log(document.getElementById('pub-payload').value);
}

function subscribeFunc(){
  // console.log("subscribe");
  // client.subscribe("mqtt/demo");
  client.subscribe(document.getElementById('sub-topic').value);
  console.log("Subscribe { topic: " + document.getElementById('sub-topic').value + " }");
    let tbl = document.getElementById('subscriber');
    let tbody = document.getElementById('submsg');
     let tr = document.createElement('tr');
     let msgTopic = document.createElement('td');
    let msgTime = document.createElement('td');
    msgTopic.appendChild(document.createTextNode(document.getElementById('sub-topic').value));
    msgTime.appendChild(document.createTextNode(moment().format('llll')));
    tr.appendChild(msgTopic);
     tr.appendChild(msgTime);
     tbody.appendChild(tr);
     tbl.appendChild(tbody);
}
// //broker
// var btnConnect = document.getElementById('connect');
// var btnDisConnect = document.getElementById('disconnect');
// var broker = document.getElementById('broker');
// var btnStatus = document.getElementById('status');

// //publisher
// var btnPublish = document.getElementById('btnPublish');
// var pubTopic = document.getElementById('pubTopic');
// var pubPayload = document.getElementById('pubPayload');

// //subscriber
// var subTopic = document.getElementById('subTopic');
// var btnSubscribe = document.getElementById('btnSubscribe');
// var btnUnsubscribe = document.getElementById('btnUnsubscribe');


// //btnConnect
// btnConnect.addEventListener('click', function (e) {
//   e.preventDefault();
//   //client
//   var client = mqtt.connect(broker.value)
  

//   btnSubscribe.addEventListener('click', function (e) {
//     e.preventDefault();

//     console.log("Subscribe{ topic: " + subTopic.value+" }");
//     client.subscribe("mqtt/" + subTopic.value);
//     let tbl = document.getElementById('subscriber');
//     let tbody = document.getElementById('submsg');
//     let tr = document.createElement('tr');
//     let msgTopic = document.createElement('td');
//     let msgTime = document.createElement('td');
//     msgTopic.appendChild(document.createTextNode(subTopic.value));
//     msgTime.appendChild(document.createTextNode(moment().format('llll')));
//     tr.appendChild(msgTopic);
//     tr.appendChild(msgTime);
//     tbody.appendChild(tr);
//     tbl.appendChild(tbody);

//     btnUnsubscribe.disabled = false;
//     btnSubscribe.disabled = true;
    

//   })

//   btnUnsubscribe.addEventListener('click', function (e) {
//     e.preventDefault();
//     client.unsubscribe("mqtt/" + subTopic.value);
//     btnUnsubscribe.disabled = true;
//     btnSubscribe.disabled = false;
//     console.log("Unsubscribe { topic : " + subTopic.value+" }");
//     client.unsubscribe(topic,payload);
//   })

//   client.on("connect", function () {
//     console.log("Successfully connected");
//     btnStatus.disabled = false;
//     btnDisConnect.disabled = false;
//     btnConnect.disabled = true;
//     btnStatus.setAttribute('value', 'Connected successfully!')
//     btnStatus.setAttribute('class', 'btn btn-success')
//   });


//   //btnDisconnect
//   btnDisConnect.addEventListener('click', function () {
//     client.end();
//     btnStatus.disabled = true;
//     btnDisConnect.disabled = true;
//     btnConnect.disabled = false;
//     console.log('Disconnected');
//     btnStatus.setAttribute('value', 'Disconnected successfully!')
//     btnStatus.setAttribute('class', 'btn btn-warning')
//   });


//   client.on("message", function (topic, payload) {
//     let finalTopic = topic.slice(5);
//     console.log("Received { topic: "+finalTopic+"; payload: "+ payload+" }");
//     let tbl = document.getElementById('receiver');
//     let tbody = document.getElementById('msg');
//     let tr = document.createElement('tr');
//     let msgTopic = document.createElement('td');
//     let msgPayload = document.createElement('td');
//     let msgTime = document.createElement('td');
//     msgTopic.appendChild(document.createTextNode(finalTopic));
//     msgPayload.appendChild(document.createTextNode(payload));
//     msgTime.appendChild(document.createTextNode(moment().format('llll')));
//     tr.appendChild(msgTopic);
//     tr.appendChild(msgPayload);
//     tr.appendChild(msgTime);
//     tbody.appendChild(tr);
//     tbl.appendChild(tbody);
//   })



//   btnPublish.addEventListener('click', function (e) {
//     e.preventDefault();
//     client.publish("mqtt/" + pubTopic.value, pubPayload.value);
//     console.log("Publish { topic: "+pubTopic.value+"; payload: "+ pubPayload.value+" }");
//     let tbl = document.getElementById('publisher');
//     let tbody = document.getElementById('pubmsg');
//     let tr = document.createElement('tr');
//     let msgTopic = document.createElement('td');
//     let msgPayload = document.createElement('td');
//     let msgTime = document.createElement('td');
//     msgTopic.appendChild(document.createTextNode(pubTopic.value));
//     msgPayload.appendChild(document.createTextNode(pubPayload.value));
//     msgTime.appendChild(document.createTextNode(moment().format('llll')));
//     tr.appendChild(msgTopic);
//     tr.appendChild(msgPayload);
//     tr.appendChild(msgTime);
//     tbody.appendChild(tr);
//     tbl.appendChild(tbody);
//   })
// });






