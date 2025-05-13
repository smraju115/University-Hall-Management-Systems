
export enum Gender{Male=1, Female=2}
export const navItems = [
    {
        label: "Home",
        link: "/home",
        icon: 'home'
    },
    {
        label: "Student",
        link: "/student-list",
        icon: 'group'

    },
    {
      label: "Dining",
      link: "/dining",
      icon: 'local_dining',
      items:[
        {
          label: "Mennu",
          link: "/menu-food",
          icon: 'menu_book'
        },
        {
          label: "Token",
          link: "/token",
          icon: 'local_activity'
        },
        {
          label: "Payment",
          link: "/payment",
          icon: 'payments'
        },
      ]
  },
  {
    label: "Hall",
    link: "/hall",
    icon: 'apartment',
    items:[
      {
        label: "Request",
        link: "/request",
        icon: 'north_east'
      }

    ]
},

];
