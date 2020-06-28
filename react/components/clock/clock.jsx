// import './clock.css';
function dateFormat(fmt, date) {
  const date_ = date ? date : new Date();

  const o = {
    'M+': date_.getMonth() + 1, //月份
    'd+': date_.getDate(), //日
    'h+': date_.getHours(), //小时
    'm+': date_.getMinutes(), //分
    's+': date_.getSeconds(), //秒
    'q+': Math.floor((date_.getMonth() + 3) / 3), //季度
    S: date_.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date_.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}

function Clock() {
  const [date, setDate] = React.useState(new Date());
  const [dateValue, setDateValue] = React.useState('');

  function copyText() {
    const text = document.getElementById('text').innerText;
    const input = document.getElementById('input');
    const message = document.getElementById('message');
    input.value = text; // 修改文本框的内容
    input.select(); // 选中文本
    document.execCommand('copy'); // 执行浏览器复制命令
    message.innerText = '复制成功！';
    setTimeout(() => {
      message.innerText = '';
    }, 1500);
  }

  React.useEffect(() => {
    function tick() {
      setDate(new Date());
    }
    const timerID = setInterval(tick, 1000);

    return function clearTick() {
      clearInterval(timerID);
    };
  });

  React.useEffect(() => {
    setDateValue(dateFormat('yyyy-MM-dd-hh-mm-ss', date));
  }, [date]);

  return (
    <div className="clock">
      <p id="text">{dateValue}</p>
      <p id="message"></p>
      <textarea id="input"></textarea>
      <button
        onClick={() => {
          copyText();
        }}
      >
        copy
      </button>
    </div>
  );
}
