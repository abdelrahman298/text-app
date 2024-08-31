const agents = [
  {
    id: 1,
    logo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWdlbnR8ZW58MHx8MHx8fDA%3D",
    role: "Account Executive",
    name: "title 1",
    properties_count: 555,
    description:
      "Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit.",
  },
  {
    id: 2,
    logo: "https://images.unsplash.com/photo-1627161684458-a62da52b51c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFnZW50fGVufDB8fDB8fHww",
    role: "Sales Director",
    name: "title 2",
    properties_count: 33,
    description:
      "Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit.",
  },
  {
    id: 3,
    logo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGFnZW50fGVufDB8fDB8fHww",
    role: "Account Executive",
    name: "title 3",
    properties_count: 444,
    description:
      "Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit.",
  },
  {
    id: 4,
    logo: "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww",
    role: "Business Development Manager",
    name: "title 4",
    properties_count: 123456,
    description:
      "Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit.",
  },
  {
    id: 5,
    logo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    role: "Sales Engineer",
    name: "title 5",
    properties_count: 33,
    description:
      "Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit.",
  },
  {
    id: 6,
    logo: "https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    role: "Account",
    name: "title 6",
    properties_count: 0,
    description:
      "Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit.",
  },
  {
    id: 7,
    logo: "https://images.unsplash.com/photo-1627161684458-a62da52b51c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFnZW50fGVufDB8fDB8fHww",
    role: "Account",
    name: "title 7",
    properties_count: 45782,
    description:
      "Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit.",
  },
  {
    id: 8,
    logo: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    role: "Account",
    name: "title 8",
    properties_count: 111,
    description:
      "Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit.",
  },
  {
    id: 9,
    logo: "https://plus.unsplash.com/premium_photo-1666265087928-fe19db9887ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    role: "Account",
    name: "title 9",
    properties_count: 9000,
    description:
      "Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit.",
  },
  {
    id: 10,
    logo: "https://plus.unsplash.com/premium_photo-1664533227571-cb18551cac82?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fG1hbnxlbnwwfHwwfHx8MA%3D%3D",
    role: "Account",
    name: "title 10",
    properties_count: 4574563,
    description:
      "Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit. Lorem ipsum dolor sitLorem ipsum dolor sit.",
  },
];
