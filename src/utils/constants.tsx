export const packages = [
    { 
        id: 0,
        program: 'advanced', 
        price: 25, 
        description: 'For most businesses that want to otpimize web queries',
        features: ['All limited links', 'Own analytics platform', 'Chat support', 'Optimize hashtags', 'Unlimited users']
    },
    { 
        id: 1,
        program: 'basic', 
        price: 15, 
        description: 'For most businesses that want to otpimize web queries',
        features: ['All limited links', 'Own analytics platform', 'Chat support', 'Optimize hashtags', 'Unlimited users']
    },
    { 
        id: 2,
        program: 'basic', 
        price: 15, 
        description: 'For most businesses that want to otpimize web queries',
        features: ['All limited links', 'Own analytics platform', 'Chat support', 'Optimize hashtags', 'Unlimited users']
    },
    { 
        id: 3,
        program: 'advanced', 
        price: 25, 
        description: 'For most businesses that want to otpimize web queries',
        features: ['All limited links', 'Own analytics platform', 'Chat support', 'Optimize hashtags', 'Unlimited users']
    },
]

export const qualifications = [
  { name: 'OND', value: 'ond' },
  { name: 'HND', value: 'hnd' },
  { name: 'DEGREE', value: 'degree' },
  { name: 'MASTERS', value: 'masters' },
  { name: 'OTHERS', value: 'others' },
]

export const nav  = [
    { name: 'Home', icon: 'home.svg', route: '/teacher/home' },
    { name: 'Activity', icon: 'chart.svg', route: '/teacher/activity' },
]

export const students = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      class: 'Advanced II',
      attendancePercentage: 90,
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      class: 'Advanced I',
      attendancePercentage: 85,
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      class: 'Basic II',
      attendancePercentage: 92,
    },
    {
      name: "Bob Brown",
      email: "bob.brown@example.com",
      class: 'Basic I',
      attendancePercentage: 88,
    },
    {
      name: "Eva Garcia",
      email: "eva.garcia@example.com",
      class: 'Basic II',
      attendancePercentage: 95,
    }
  ];

  export const teachers = [
    { name: 'Cynthia Nwadiora', id: 0 },
    { name: 'Winifred Shima', id: 1 }
  ]

export const attendance = [
   { day: new Date(), status: true },
   { day: new Date(), status: false },
   { day: new Date(), status: true },
   { day: new Date(), status: true },
   { day: new Date(), status: false },
   { day: new Date(), status: true },
   { day: new Date(), status: true },
   { day: new Date(), status: false },
]

export const Days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat",]
export const Times = ["00:00AM", "1:00AM", "2:00AM", "3:00AM", "4:00AM", "5:00AM", "6:00AM", "7:00AM", "8:00AM", "9:00AM", "10:00AM", 
"11:00AM", "12:00PM", "13:00PM", "14:00PM", "15:00PM", "16:00PM", "17:00PM", "18:00PM", "19:00PM", "20:00PM", "21:00PM",
"22:00PM", "23:00PM"]
  