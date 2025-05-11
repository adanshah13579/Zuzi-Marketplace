export const categories = [
  {
    id: 1,
     name: 'דירה 4 חדרים בתל אביב',
      description: 'דירה מרווחת בקומה 3, 120 מ"ר, מרפסת גדולה, חניה',
      price: 2500000,
      location: 'תל אביב',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 4,
      floor: 3,
      size: 120,
      parking: true,
    subcategories: [
      { id: 101, name: 'דירות' },
      { id: 102, name: 'בתים פרטיים' },
      { id: 103, name: 'דירות גן' },
      { id: 104, name: 'מגרשים' },
      { id: 105, name: 'נכסים מסחריים' }
    ]
  },
  {
    id: 2,
        name: 'דירה להשכרה בחיפה',
      description: 'דירה 3 חדרים, 90 מ"ר, מרפסת, חניה',
      price: 4500,
      location: 'חיפה',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 3,
      floor: 2,
      size: 90,
      parking: true,
    subcategories: [
      { id: 201, name: 'דירות להשכרה' },
      { id: 202, name: 'בתים להשכרה' },
      { id: 203, name: 'חדרים להשכרה' },
      { id: 204, name: 'נכסים מסחריים להשכרה' }
    ]
  },
  {
    id: 3,
    name: 'גור לברדור',
      description: 'גור לברדור, זכר, בן 3 חודשים, מחוסן',
      price: 2500,
      location: 'תל אביב',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 1,
      floor: 3,
      size: 25,
      parking: false,
    subcategories: [
      { id: 301, name: 'כלבים' },
      { id: 302, name: 'חתולים' },
      { id: 303, name: 'ציפורים' },
      { id: 304, name: 'דגים' },
      { id: 305, name: 'חיות אחרות' }
    ]
  },
  {
    id: 4,
      name: 'מחשב נייד',
      description: 'MacBook Pro 2020, 16GB RAM, 512GB SSD',
      price: 4500,
      location: 'תל אביב',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 1,
      floor: 3,
      size: 25,
      parking: false,
    subcategories: [
      { id: 401, name: 'ריהוט' },
      { id: 402, name: 'אלקטרוניקה' },
      { id: 403, name: 'ביגוד' },
      { id: 404, name: 'ספרים' },
      { id: 405, name: 'צעצועים' }
    ]
  },
  {
    id: 5,
    name: 'שירותי אינסטלציה',
      description: 'אינסטלטור מקצועי לכל סוגי התיקונים',
      price: 180,
      location: 'חיפה',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 1,
      floor: 3,
      size: 25,
      parking: false,
    subcategories: [
      { id: 501, name: 'שיפוצים' },
      { id: 502, name: 'הובלות' },
      { id: 503, name: 'נגרות' },
      { id: 504, name: 'אינסטלציה' },
      { id: 505, name: 'חשמל' }
    ]
  }
];

export const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1531838525357-5600261f4771?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    title: 'מצא פריטים משומשים באיכות גבוהה',
    subtitle: 'גלה עסקאות מעולות על פריטים משומשים באזורך'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1563528583578-3cd3c4f70c5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    title: 'מכור את הפריטים שלך',
    subtitle: 'הפוך פריטים לא רצויים למזומן ועזור לאחרים למצוא מה שהם צריכים'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    title: 'קהילה מקומית',
    subtitle: 'התחבר למוכרים באזורך'
  }
]; 

export const sampleListings = {
  1: [ // Real Estate for Sale
    {
      id: 1,
      name: 'דירה 4 חדרים בתל אביב',
      description: 'דירה מרווחת בקומה 3, 120 מ"ר, מרפסת גדולה, חניה',
      price: 2500000,
      location: 'תל אביב',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 4,
      floor: 3,
      size: 120,
      parking: true
    },
    {
      id: 2,
      name: 'בית פרטי ברעננה',
      description: 'בית 5 חדרים, 200 מ"ר, גינה גדולה, 2 חניות',
      price: 3500000,
      location: 'רעננה',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 5,
      floor: 0,
      size: 200,
      parking: true
    },
    {
      id: 3,
      name: 'דירת גן בפתח תקווה',
      description: 'דירת גן 3 חדרים, 100 מ"ר, גינה פרטית, חניה',
      price: 1800000,
      location: 'פתח תקווה',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 3,
      floor: 0,
      size: 100,
      parking: true
    },
    {
      id: 4,
      name: 'דירה 3 חדרים בחיפה',
      description: 'דירה בקומה 5, 90 מ"ר, מרפסת, חניה',
      price: 1200000,
      location: 'חיפה',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 3,
      floor: 5,
      size: 90,
      parking: true
    }
  ],
  2: [ // Real Estate for Rent
    {
      id: 5,
      name: 'דירה להשכרה בחיפה',
      description: 'דירה 3 חדרים, 90 מ"ר, מרפסת, חניה',
      price: 4500,
      location: 'חיפה',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 3,
      floor: 2,
      size: 90,
      parking: true
    },
    {
      id: 6,
      name: 'חדר להשכרה בירושלים',
      description: 'חדר במיקום מרכזי, שותפים שקטים, אינטרנט מהיר',
      price: 2000,
      location: 'ירושלים',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 1,
      floor: 3,
      size: 25,
      parking: false
    },
    {
      id: 7,
      name: 'דירה להשכרה בתל אביב',
      description: 'דירה 2 חדרים, 60 מ"ר, מרפסת, חניה',
      price: 6000,
      location: 'תל אביב',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 2,
      floor: 4,
      size: 60,
      parking: true
    },
    {
      id: 8,
      name: 'בית להשכרה במודיעין',
      description: 'בית 4 חדרים, 150 מ"ר, גינה, 2 חניות',
      price: 8000,
      location: 'מודיעין',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 4,
      floor: 0,
      size: 150,
      parking: true
    }
  ],
  3: [ // Pets
    {
      id: 9,
      name: 'גור לברדור',
      description: 'גור לברדור, זכר, בן 3 חודשים, מחוסן',
      price: 2500,
      location: 'תל אביב',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 1,
      floor: 3,
      size: 25,
      parking: false
    },
    {
      id: 10,
      name: 'חתול פרסי',
      description: 'חתול פרסי, נקבה, בת 6 חודשים, מחוסנת',
      price: 1800,
      location: 'רמת גן',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 1,
      floor: 3,
      size: 25,
      parking: false  
    },
    {
      id: 11,
      name: 'תוכי אפרור',
      description: 'תוכי אפרור, זכר, בן שנה, מאולף',
      price: 3000,
      location: 'חיפה',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 1,
      floor: 3,
      size: 25,
      parking: false
    },
    {
      id: 12,
      name: 'דגי זהב',
      description: 'זוג דגי זהב, בריאים, עם אקווריום',
      price: 200,
      location: 'ירושלים',
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 1,
      floor: 3,
      size: 25,
      parking: false
    }
  ],
  4: [ // Second-hand Products
    {
      id: 13,
      name: 'ספה משומשת',
      description: 'ספה 3 מושבים, מצב מעולה, צבע אפור',
      price: 800,
      location: 'חולון',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 1,
      floor: 3,
      size: 25,
      parking: false
    },
    {
      id: 14,
      name: 'מחשב נייד',
      description: 'MacBook Pro 2020, 16GB RAM, 512GB SSD',
      price: 4500,
      location: 'תל אביב',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 1,
      floor: 3,
      size: 25,
      parking: false
    },
    {
      id: 15,
      name: 'ארון בגדים',
      description: 'ארון בגדים 3 דלתות, מצב טוב, צבע לבן',
      price: 500,
      location: 'רמת גן',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 1,
      floor: 3,
      size: 25,
      parking: false
    },
    {
      id: 16,
      name: 'טלוויזיה',
      description: 'טלוויזיה 55 אינץK 4K',
      price: 2000,
      location: 'חיפה',
      image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 1,
      floor: 3,
      size: 25,
      parking: false
    }
  ],
  5: [ // Professionals
    {
      id: 17,
      name: 'שירותי שיפוצים',
      description: 'בעל מקצוע מנוסה לשיפוצים, תיקונים והתקנות',
      price: 150,
      location: 'תל אביב',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 1,
      floor: 3,
      size: 25,
      parking: false
    },
    {
      id: 18,
      name: 'שירותי הובלות',
      description: 'שירותי הובלה מקצועיים בכל הארץ',
      price: 300,
      location: 'מרכז',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 1,
      floor: 3,
      size: 25,
      parking: false
    },
    {
      id: 19,
      name: 'שירותי נגרות',
      description: 'נגר מקצועי לכל סוגי העבודות',
      price: 200,
      location: 'ירושלים',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 1,
      floor: 3,
      size: 25,
      parking: false
    },
    {
      id: 20,
      name: 'שירותי אינסטלציה',
      description: 'אינסטלטור מקצועי לכל סוגי התיקונים',
      price: 180,
      location: 'חיפה',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      rooms: 1,
      floor: 3,
      size: 25,
      parking: false
    }
  ]
};