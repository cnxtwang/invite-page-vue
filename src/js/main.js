import '../style/index.scss'
import '../../index.html'

let $eMail = document.getElementById('eMail')
let $users = document.getElementsByName('user')
let $invite = document.getElementById('invite')
let availableNumber = document.getElementById('availableNumber')
let $main = document.getElementsByTagName('main')[0]

let calcAvailableNumebr = () => {
  const $selectedUsers = document.querySelectorAll('input[name="user"]:checked')
  availableNumber.innerText = $users.length - $selectedUsers.length

  let isNotAllow = !($selectedUsers.length || $eMail.value);
  $invite.disabled = isNotAllow
  $invite.className = isNotAllow ? 'disabled' : ''
}

$main.addEventListener('click', (evt) => {
  if(evt.target.type !== 'checkbox') return
  calcAvailableNumebr()
})

$invite.addEventListener('click', () => {
  const $selectedUsers = document.querySelectorAll('input[name="user"]:checked')
  let message = ''

  $selectedUsers.forEach(user => {
    message += user.value + ' '
  })

  alert(message + $eMail.value + ' has been invited')
})

$eMail.addEventListener('keyup', calcAvailableNumebr)

calcAvailableNumebr()