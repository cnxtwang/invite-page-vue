import '../style/index.scss'

const Event = new Vue()

Vue.component('available-number', {
  template: `<p><span id="availableNumber">{{availableNumber}}</span> invites available</p>`,
  data() {
    return {
      availableNumber: ''
    }
  },
  created() {
    Event.$on('availableNumber', data => {
      this.availableNumber = data.availableUserNumber
    })
  }
})

Vue.component('search-bar', {
  template: `
    <div class="search-bar">
      <input type="text" id="search">
      <label for="search"><img src="./src/static/search.png" alt="search"></label>
    </div>
  `
})

Vue.component('user-list', {
  template: `
    <div>
      <user v-for="user in users"
        :user="user"
        @click="onSelectUser"
      ></user>
    </div>
  `,
  data() {
    return {
      users: [
        {
          name: 'Alex',
          skill: 'photoshop,pinanacle studio',
          location: 'Belarus',
          url: 'bymart.by',
          checked: true,
          img: 'http://i.pravatar.cc/80?img=9'
        },
        {
          name: 'Alina',
          location: 'Ukranine Kiev',
          url: 'kuvshynove.com',
          checked: '',
          img: 'http://i.pravatar.cc/80?img=10'
        },
        {
          name: 'Yolanda',
          skill: 'wordpress,web design,joomla html',
          location: 'Palam de Mallorica',
          url: 'yollandagranados.com',
          checked: '',
          img: 'http://i.pravatar.cc/80?img=11'
        }
      ]
    }
  },
  mounted() {
    this.user = this.$children
    this.onSelectUser()
  },
  methods: {
    onSelectUser() {
      const availableUserNumber = this.users.filter(item => !item.checked).length
      Event.$emit('availableNumber', {
        availableUserNumber,
        allUser: this.users
      })
    }
  }
})

Vue.component('user', {
  template: `
    <div class="user">
      <img :src="user.img" :alt="user.name">
      <aside>
        <div class="name">{{user.name}}</div>
        <div class="skill">{{user.skill}}</div>
        <div class="location">
          {{user.location}}<span class="url">{{user.url}}</span>
        </div>
      </aside>
      <div class="custom-checkbox">
        <input
          type="checkbox" 
          name="user" 
          :id="'checkbox-' + user.name" 
          :value="user.name"
          v-model="user.checked"
          @change="calcAvailableNumber"
        >
        <label :for="'checkbox-' + user.name"></label>
      </div>
    </div>
  `,
  props: ['user'],
  data() {
    return {
      selected: false
    }
  },
  created() {
    this.selected = this.user.checked
  },
  methods: {
    calcAvailableNumber() {
      this.$emit('click')
    }
  }
})

Vue.component('invite', {
  template: `
    <div>
      <input type="text" id="eMail" placeholder="Send invite by e-mail">
      <button 
        :class="{disabled: isDisabled}" 
        id="invite" 
        :disabled="isDisabled"
        @click="invitePeople"
        >invite</button>
    </div>
  `,
  data() {
    return {
      isDisabled: false,
      allUser: []
    }
  },
  created() {
    Event.$on('availableNumber', data => {
      this.allUser = data.allUser
      this.isDisabled = (data.allUser.length - data.availableUserNumber) === 0
    })
  },
  methods: {
    invitePeople() {
      let message = ''
      this.allUser.forEach(user => {
        if(user.checked) message += user.name + ' '
      })
      alert(message + 'has been invited')
    }
  }
})

let app = new Vue({
  el: '#app'
})
