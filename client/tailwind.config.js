/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors:
      {
        customgreen:'#00a884',
        customwhite:'#f0f2f5',
        chatbg:'#ffffff',
        custompurple:"#D800FF",
        custompurple2:"#E033FF",
        statuswhite:'#ffffff'
      },
      screens:
      {
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1281px',
        'nexsus':'1280px',
        'l2':'1496px',
        // mobiles
        'SE': '375px',
        'XR': '414px',
        'PRO':'390px',
        'PMAX':'430px',
        'PIX':'412px',
        'S8':'360px',
        'c1':'769px',
      // Tabs
      'IPADMINI':'768px',
      'IPADAir':'820px',
      'IPADPRO':'1024px',
      'fold':'853px',
      'Pro7':'912px',
      'rotate':'1180px',
      'rotate2':'1366px',
      },
      height: {
        'custom-height': '400px',
        'custom-height-1': '600px',
        'custom-height-1.2': '625px',
        'custom-height-1.1': '690px',
        'custom-height-2': '500px',
        'custom-height-2.2': '535px',
        'custom-height-2.8': '550px',
        'custom-height-2.9': '590px',
        'custom-height-3': '480px',
        'custom-height-4': '530px',
        'custom-height-5': '750px',
        'custom-height-5.0': '700px',
        'custom-height-5.5': '780px',
        'custom-height-6': '800px',
        
        'custom-height-tab': '900px',
        'custom-height-tab2': '1050px',
        'custom-height-tab4': '1060px',
        'custom-height-tab3': '1000px',
        // Add more custom heights here
      },

    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        /* Hide scrollbar for Chrome, Safari and Opera */
        ".no-scrollbar::-webkit-scrollbar": { display: "none" },
        /* Hide scrollbar for IE, Edge and Firefox */
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-overflow": "hidden"
        }
      };

      addUtilities(newUtilities);
    }
  ]
}