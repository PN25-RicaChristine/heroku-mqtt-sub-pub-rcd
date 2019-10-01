
//broker
var btnConnect = document.getElementById('connect');
var btnDisConnect = document.getElementById('disconnect');
var broker = document.getElementById('broker');
var btnStatus = document.getElementById('status');

//publisher
var btnPublish = document.getElementById('publish');
var pubTopic = document.getElementById('pub-topic');
var pubPayload = document.getElementById('pub-payload');

//subscriber
var subTopic = document.getElementById('sub-topic');
var btnSubscribe = document.getElementById('subscribe');
var btnUnsubscribe = document.getElementById('btnUnsubscribe');


// basic functionalities
function connectFunc() {
  console.log("Connecting..");
  // client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
  client = mqtt.connect(document.getElementById('broker').value)
  console.log(document.getElementById('broker').value);

  client.on("connect", function () {
    console.log("Successfully connected");
    btnStatus.disabled = false;
    btnDisConnect.disabled = false;
    btnConnect.disabled = true;
    btnStatus.setAttribute('value', 'Connected successfully!')
    btnStatus.setAttribute('class', 'btn btn-success')
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
function publishFunc() {
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

function subscribeFunc() {
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

  btnUnsubscribe.disabled = false;
  btnSubscribe.disabled = true;
}

function unsubscribeFunc() {
  client.unsubscribe(document.getElementById('sub-topic').value);
  console.log("Unsubscribe { topic: " + document.getElementById('sub-topic').value + " }");

  btnUnsubscribe.disabled = true;
  btnSubscribe.disabled = false;

}

// basic functionalities
function disconnectFunc() {
  client.end();
  btnStatus.disabled = true;
  btnDisConnect.disabled = true;
  btnConnect.disabled = false;
  console.log('Disconnected');
  btnStatus.setAttribute('value', 'Disconnected successfully!')
  btnStatus.setAttribute('class', 'btn btn-warning')

}


