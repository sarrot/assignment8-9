document.getElementById("abouttxt").innerHTML = "My name is Rotem Sarusi, I'm 26 years old and originally from Metar.\n" +
    "        I am a third year student in the : Industrial Engineering and Management department in Ben Gurion University.\n" +
    "        I like to spend time with my family and friends, dive and cook.";

document.getElementById("exptxt").innerHTML = "• Call center in the economic company for the development of the string (security unit) - providing an ongoing response\n" +
    "         for the residents of the locality in the event of incidents and problems, both personal and security. Working with many factors\n" +
    "         in the security of the settlement and its maintenance."

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);

  document.getElementById("time").innerHTML = h + ":" + m + ":" + s;

  var t = setTimeout(startTime, 500);
  n = new Date();
  y = n.getFullYear();
  m = n.getMonth() + 1;
  d = n.getDate();

  document.getElementById("date").innerHTML = m + "•" + d + "•" + y;
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

document.getElementById('fetchUserData').addEventListener('click', fetchUserData);

function fetchUserData(){
  let menus= document.getElementsByClassName("section");
  for(let i=0;i<menus.length;i++)
		menus[i].style.display = "none";
  fetch('https://reqres.in/api/users')
      .then(response => response.json())
      .then(users => {
        let output = '<h2>Lists of Users</h2>';
        output += '<ul>';
        users.data.map(user =>
        {
          output += `
                            <li>
                                ${user.first_name} ${user.last_name}
                            </li>
                        `;
        });
        output += '</ul>'
        document.getElementById("response").innerHTML = output;
        let show = document.getElementById("contactList");
       show.style.display='block';
      });
}

function navButton() {
    let menus = document.getElementsByClassName("section");
    let contact = document.getElementById("contactList");
        contact.style.display = 'none';
    for (let i = 0; i < menus.length; i++)
        menus[i].style.display = "block";
}