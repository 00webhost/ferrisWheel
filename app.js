const cafeList = document.querySelector('#cafe-list');


function trim(s) {
    var t = "";
    var cnt = 0;
    for(i = 0; i<s.length; i++) {
      if(cnt > 2) {
        break;
      } 
      else {
        t+=s[i];
        if(cnt > 0) cnt++;
      }
      if(s[i] == '.') {
          cnt = 1;
      }
    }
    return t;
}

function renderGameList(ul_divchild, past, best, i, timePast, timeBest) {
   let li = document.createElement('li');
   let pastGame = document.createElement('span');
   let bestGame = document.createElement('span');
   li.textContent = 'GAME ' + i + ':';
   pastGame.textContent = 'PAST-SCORE: ' + past + ' seconds,    on ' + timePast;
   bestGame.textContent = 'BEST-SCORE: ' + best + ' seconds,    on ' + timeBest; 
   bestGame.style.color = 'green'
   pastGame.style.color = 'grey'
   bestGame.style.fontWeight = '600'
   li.style.color = 'brown'
   li.append(pastGame)
   li.append(bestGame)
   ul_divchild.appendChild(li);
}


var cnt = 1;
// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let cross = document.createElement('div');
    cross.classList.add('lidiv')
    cross.style.cursor = 'pointer'
    cross.textContent = 'View';
    name.classList.add('user')
    li.setAttribute('data-id', doc.id);
    name.textContent = cnt + '. ' + doc.data().userEmail;
    cnt++;
    
    // parent div
    let div = document.createElement('div');
    div.classList.add('modalHide');
    div.setAttribute('id', doc.id);

    // child divchild
    let divchild = document.createElement('div');
    divchild.classList.add('modal-content');
    divchild.textContent = 'Games Played:';
    divchild.style.color = 'white';
    divchild.style.fontSize = '30px';
    // child-child span
    let span = document.createElement('span');
    span.setAttribute('idd',doc.id);
    span.classList.add('close');
    span.textContent = 'x';


    let ul_divchild = document.createElement('ul');
    if(doc.data().userHasPlayed == 0) {
       let li = document.createElement('li');
       li.textContent = 'NO GAMES PLAYED YET :('
       li.style.color = 'grey'
       ul_divchild.appendChild(li);
    }
    else 
    for(game = 1; game<=4; game++) {
        if(doc.data().pastTrials[game][0].length > 0) {
            var past = trim(doc.data().pastTrials[game][0]);
            var best = trim(doc.data().bestTrials[game][0]);
            var timePast = doc.data().pastTrials[game][1].toDate(), timeBest = doc.data().bestTrials[game][1].toDate();
            renderGameList(ul_divchild, past, best, game, timePast, timeBest);
        }
    }

    divchild.append(span);
    divchild.append(ul_divchild);



    div.appendChild(divchild);
    //event listeners

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        let el = document.getElementById(id);
        el.classList.remove('modalHide');
        el.classList.add('modalView');
        console.log(id);
    })


    span.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.getAttribute('idd');
        let el = document.getElementById(id);
        el.classList.remove('modalView');
        el.classList.add('modalHide');
        console.log(id);
    })

    
    li.appendChild(div);
    
    li.appendChild(name);
    li.appendChild(cross);
    cafeList.appendChild(li);
}



// getting data
db.collection('users').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
});