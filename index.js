let obj = {};
const sendBtn = document.querySelector('.send');
const showBtn = document.querySelector('.show');
const cleanBtn = document.querySelector('.clean');

const fetchPostData = async (one, two) => {
  try {
    const url = 'http://localhost:5000';
    const response = await fetch(`${url}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ one, two }),
    });
    const json = await response.json();

    return json;
  } catch (err) {
    return new Error('Could not post data');
  }
};

const fetchGetData = async () => {
  try {
    const url = 'http://localhost:5000';
    const response = await fetch(`${url}/`);
    const json = await response.json();

    return json;
  } catch (err) {
    return new Error('Could not load data');
  }
};

sendBtn.onclick = async () => {
  obj['one'] = document.querySelector('.one').value;
  obj['two'] = document.querySelector('.two').value;
  if (obj.one !== '' && obj.two !== '') {
    try {
      fetchPostData(obj.one, obj.two, Date.now());
      sendBtn.style.border = 'solid rgb(71, 177, 133) 2px';
      sendBtn.style.backgroundColor = 'rgba(71, 177, 133, .1)';
    } catch (e) {
      errorBtn();
    }
  } else {
    errorBtn();
  }
};

const table = document.querySelector('.table');
const tr = document.querySelector('.inputsValue');

showBtn.onclick = async () => {
  const rows = await fetchGetData();
  for (let record of rows) {
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    td1.textContent = record.One;
    td2.textContent = record.Two;
    let row = document.createElement('tr');
    row.append(td1, td2);
    tr.after(row);
  }
  table.style.display = 'flex';
  showBtn.setAttribute('disabled', true);
};

cleanBtn.onclick = () => {
  const tbl = document.querySelector('.tbl');
  const firstRow = tbl.rows[0];
  tbl.innerHTML = '';
  tbl.append(firstRow);
  showBtn.removeAttribute('disabled');
  table.style.display = 'none';
  document.querySelector('.one').value = '';
  document.querySelector('.two').value = '';
  obj = {};
  sendBtn.style.border = 'solid rgb(141, 103, 189) 2px';
  sendBtn.style.backgroundColor = 'transparent';
};

const errorBtn = () => {
  sendBtn.style.border = 'solid rgb(255, 73, 73) 2px';
  sendBtn.style.backgroundColor = 'rgba(255, 73, 73, .1)';
};
