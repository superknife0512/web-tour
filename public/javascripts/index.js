new Vue ({ 
  el: '#tours',
  data: {
    tours: [
      {
        title: 'Da Nang Tour',
        desc: 'Awesome tour from Quang Nam to Danang and more beautiful place',
        discount: 45,
        price: 300,
        people: 2,
        duration: 3,
        img: './images/beach.jpg'
      },
      {
        title: 'Hoi An Tour',
        desc: 'Enjoy the ancient atmosphere at Hoi An with you awesome family',
        discount: 40,
        price: 350,
        people: 3,
        duration: 2,
        img: './images/hoian.jpg'
      },
      {
        title: 'Phong Nha Tour',
        desc: 'Discover the deepest cave with our professional team',
        discount: 30,
        price: 540,
        people: 2,
        duration: 7,
        img: './images/tamcoc.jpg'
      },
    ]
  }
})