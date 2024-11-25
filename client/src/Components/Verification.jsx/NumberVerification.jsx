import { useState, useRef } from "react";
import {  Box, Button, Flex, Input, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { UsedbContext } from "../../Hooks/UsedbContext";
import { MobileAuthentication } from "../../Services/api";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
function NumberVerification({setlogin_num}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [Countrycode,setCountrycode] = useState('');
  const [Countryname,setCountryname] = useState('Select Country');
  const [confirmResult, setConfirmResult] = useState(null);
  const [otp, setOTP] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);

  const { setuprecaptcha,setcurrentuser ,disotp,setdisotp,setnewuser,setnewpno} = UsedbContext();
  const [error,seterror] = useState(false);
  // Function to set up reCAPTCHA and send OTP
  
  const getotp = async (e) => {
    e.preventDefault();
    const hell= Countrycode+phoneNumber;
    console.log('number',hell)
    if (phoneNumber&&phoneNumber.length==10&&hell) {
      try {
        const res= await setuprecaptcha(hell);
        setnewpno(hell);
        console.log(res);
        setConfirmResult(res);
        if(res)
          {
            setdisotp(true);
          }
        console.log('OTP sent:', res);
      } catch (error) {
        console.error('Error during sign-in with phone number:', error);
      }
    } else {
      seterror(true);
      console.log('Phone number is required');
    }
  };
 

  // Handle OTP input
  const handleInput = (event, index) => {
    const { value } = event.target;

    if (isNaN(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Auto-focus next input field
    if (value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Function to verify OTP and log in
  const verifyotpandlogin = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      console.log('Invalid OTP');
      return;
    }
    try {
      const result = await confirmResult.confirm(otpValue);
      console.log('User signed in:', result.user);
      const authentication = await MobileAuthentication(Countrycode+phoneNumber);
      if (authentication) {

        console.log('Authentication successful:', authentication);
        setcurrentuser(authentication.data);  
      } else {
        console.log('No account found');
        setnewuser(true);
       
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };
  
 
    const countries= [
      {
        "code": "+7 840",
        "name": "Abkhazia"
      },
      {
        "code": "+93",
        "name": "Afghanistan"
      },
      {
        "code": "+355",
        "name": "Albania"
      },
      {
        "code": "+213",
        "name": "Algeria"
      },
      {
        "code": "+1 684",
        "name": "American Samoa"
      },
      {
        "code": "+376",
        "name": "Andorra"
      },
      {
        "code": "+244",
        "name": "Angola"
      },
      {
        "code": "+1 264",
        "name": "Anguilla"
      },
      {
        "code": "+1 268",
        "name": "Antigua and Barbuda"
      },
      {
        "code": "+54",
        "name": "Argentina"
      },
      {
        "code": "+374",
        "name": "Armenia"
      },
      {
        "code": "+297",
        "name": "Aruba"
      },
      {
        "code": "+247",
        "name": "Ascension"
      },
      {
        "code": "+61",
        "name": "Australia"
      },
      {
        "code": "+672",
        "name": "Australian External Territories"
      },
      {
        "code": "+43",
        "name": "Austria"
      },
      {
        "code": "+994",
        "name": "Azerbaijan"
      },
      {
        "code": "+1 242",
        "name": "Bahamas"
      },
      {
        "code": "+973",
        "name": "Bahrain"
      },
      {
        "code": "+880",
        "name": "Bangladesh"
      },
      {
        "code": "+1 246",
        "name": "Barbados"
      },
      {
        "code": "+1 268",
        "name": "Barbuda"
      },
      {
        "code": "+375",
        "name": "Belarus"
      },
      {
        "code": "+32",
        "name": "Belgium"
      },
      {
        "code": "+501",
        "name": "Belize"
      },
      {
        "code": "+229",
        "name": "Benin"
      },
      {
        "code": "+1 441",
        "name": "Bermuda"
      },
      {
        "code": "+975",
        "name": "Bhutan"
      },
      {
        "code": "+591",
        "name": "Bolivia"
      },
      {
        "code": "+387",
        "name": "Bosnia and Herzegovina"
      },
      {
        "code": "+267",
        "name": "Botswana"
      },
      {
        "code": "+55",
        "name": "Brazil"
      },
      {
        "code": "+246",
        "name": "British Indian Ocean Territory"
      },
      {
        "code": "+1 284",
        "name": "British Virgin Islands"
      },
      {
        "code": "+673",
        "name": "Brunei"
      },
      {
        "code": "+359",
        "name": "Bulgaria"
      },
      {
        "code": "+226",
        "name": "Burkina Faso"
      },
      {
        "code": "+257",
        "name": "Burundi"
      },
      {
        "code": "+855",
        "name": "Cambodia"
      },
      {
        "code": "+237",
        "name": "Cameroon"
      },
      {
        "code": "+1",
        "name": "Canada"
      },
      {
        "code": "+238",
        "name": "Cape Verde"
      },
      {
        "code": "+ 345",
        "name": "Cayman Islands"
      },
      {
        "code": "+236",
        "name": "Central African Republic"
      },
      {
        "code": "+235",
        "name": "Chad"
      },
      {
        "code": "+56",
        "name": "Chile"
      },
      {
        "code": "+86",
        "name": "China"
      },
      {
        "code": "+61",
        "name": "Christmas Island"
      },
      {
        "code": "+61",
        "name": "Cocos-Keeling Islands"
      },
      {
        "code": "+57",
        "name": "Colombia"
      },
      {
        "code": "+269",
        "name": "Comoros"
      },
      {
        "code": "+242",
        "name": "Congo"
      },
      {
        "code": "+243",
        "name": "Congo, Dem. Rep. of (Zaire)"
      },
      {
        "code": "+682",
        "name": "Cook Islands"
      },
      {
        "code": "+506",
        "name": "Costa Rica"
      },
      {
        "code": "+385",
        "name": "Croatia"
      },
      {
        "code": "+53",
        "name": "Cuba"
      },
      {
        "code": "+599",
        "name": "Curacao"
      },
      {
        "code": "+537",
        "name": "Cyprus"
      },
      {
        "code": "+420",
        "name": "Czech Republic"
      },
      {
        "code": "+45",
        "name": "Denmark"
      },
      {
        "code": "+246",
        "name": "Diego Garcia"
      },
      {
        "code": "+253",
        "name": "Djibouti"
      },
      {
        "code": "+1 767",
        "name": "Dominica"
      },
      {
        "code": "+1 809",
        "name": "Dominican Republic"
      },
      {
        "code": "+670",
        "name": "East Timor"
      },
      {
        "code": "+56",
        "name": "Easter Island"
      },
      {
        "code": "+593",
        "name": "Ecuador"
      },
      {
        "code": "+20",
        "name": "Egypt"
      },
      {
        "code": "+503",
        "name": "El Salvador"
      },
      {
        "code": "+240",
        "name": "Equatorial Guinea"
      },
      {
        "code": "+291",
        "name": "Eritrea"
      },
      {
        "code": "+372",
        "name": "Estonia"
      },
      {
        "code": "+251",
        "name": "Ethiopia"
      },
      {
        "code": "+500",
        "name": "Falkland Islands"
      },
      {
        "code": "+298",
        "name": "Faroe Islands"
      },
      {
        "code": "+679",
        "name": "Fiji"
      },
      {
        "code": "+358",
        "name": "Finland"
      },
      {
        "code": "+33",
        "name": "France"
      },
      {
        "code": "+596",
        "name": "French Antilles"
      },
      {
        "code": "+594",
        "name": "French Guiana"
      },
      {
        "code": "+689",
        "name": "French Polynesia"
      },
      {
        "code": "+241",
        "name": "Gabon"
      },
      {
        "code": "+220",
        "name": "Gambia"
      },
      {
        "code": "+995",
        "name": "Georgia"
      },
      {
        "code": "+49",
        "name": "Germany"
      },
      {
        "code": "+233",
        "name": "Ghana"
      },
      {
        "code": "+350",
        "name": "Gibraltar"
      },
      {
        "code": "+30",
        "name": "Greece"
      },
      {
        "code": "+299",
        "name": "Greenland"
      },
      {
        "code": "+1 473",
        "name": "Grenada"
      },
      {
        "code": "+590",
        "name": "Guadeloupe"
      },
      {
        "code": "+1 671",
        "name": "Guam"
      },
      {
        "code": "+502",
        "name": "Guatemala"
      },
      {
        "code": "+224",
        "name": "Guinea"
      },
      {
        "code": "+245",
        "name": "Guinea-Bissau"
      },
      {
        "code": "+595",
        "name": "Guyana"
      },
      {
        "code": "+509",
        "name": "Haiti"
      },
      {
        "code": "+504",
        "name": "Honduras"
      },
      {
        "code": "+852",
        "name": "Hong Kong SAR China"
      },
      {
        "code": "+36",
        "name": "Hungary"
      },
      {
        "code": "+354",
        "name": "Iceland"
      },
      {
        "code": "+91",
        "name": "India"
      },
      {
        "code": "+62",
        "name": "Indonesia"
      },
      {
        "code": "+98",
        "name": "Iran"
      },
      {
        "code": "+964",
        "name": "Iraq"
      },
      {
        "code": "+353",
        "name": "Ireland"
      },
      {
        "code": "+972",
        "name": "Israel"
      },
      {
        "code": "+39",
        "name": "Italy"
      },
      {
        "code": "+225",
        "name": "Ivory Coast"
      },
      {
        "code": "+1 876",
        "name": "Jamaica"
      },
      {
        "code": "+81",
        "name": "Japan"
      },
      {
        "code": "+962",
        "name": "Jordan"
      },
      {
        "code": "+7 7",
        "name": "Kazakhstan"
      },
      {
        "code": "+254",
        "name": "Kenya"
      },
      {
        "code": "+686",
        "name": "Kiribati"
      },
      {
        "code": "+965",
        "name": "Kuwait"
      },
      {
        "code": "+996",
        "name": "Kyrgyzstan"
      },
      {
        "code": "+856",
        "name": "Laos"
      },
      {
        "code": "+371",
        "name": "Latvia"
      },
      {
        "code": "+961",
        "name": "Lebanon"
      },
      {
        "code": "+266",
        "name": "Lesotho"
      },
      {
        "code": "+231",
        "name": "Liberia"
      },
      {
        "code": "+218",
        "name": "Libya"
      },
      {
        "code": "+423",
        "name": "Liechtenstein"
      },
      {
        "code": "+370",
        "name": "Lithuania"
      },
      {
        "code": "+352",
        "name": "Luxembourg"
      },
      {
        "code": "+853",
        "name": "Macau SAR China"
      },
      {
        "code": "+389",
        "name": "Macedonia"
      },
      {
        "code": "+261",
        "name": "Madagascar"
      },
      {
        "code": "+265",
        "name": "Malawi"
      },
      {
        "code": "+60",
        "name": "Malaysia"
      },
      {
        "code": "+960",
        "name": "Maldives"
      },
      {
        "code": "+223",
        "name": "Mali"
      },
      {
        "code": "+356",
        "name": "Malta"
      },
      {
        "code": "+692",
        "name": "Marshall Islands"
      },
      {
        "code": "+596",
        "name": "Martinique"
      },
      {
        "code": "+222",
        "name": "Mauritania"
      },
      {
        "code": "+230",
        "name": "Mauritius"
      },
      {
        "code": "+262",
        "name": "Mayotte"
      },
      {
        "code": "+52",
        "name": "Mexico"
      },
      {
        "code": "+691",
        "name": "Micronesia"
      },
      {
        "code": "+1 808",
        "name": "Midway Island"
      },
      {
        "code": "+373",
        "name": "Moldova"
      },
      {
        "code": "+377",
        "name": "Monaco"
      },
      {
        "code": "+976",
        "name": "Mongolia"
      },
      {
        "code": "+382",
        "name": "Montenegro"
      },
      {
        "code": "+1664",
        "name": "Montserrat"
      },
      {
        "code": "+212",
        "name": "Morocco"
      },
      {
        "code": "+95",
        "name": "Myanmar"
      },
      {
        "code": "+264",
        "name": "Namibia"
      },
      {
        "code": "+674",
        "name": "Nauru"
      },
      {
        "code": "+977",
        "name": "Nepal"
      },
      {
        "code": "+31",
        "name": "Netherlands"
      },
      {
        "code": "+599",
        "name": "Netherlands Antilles"
      },
      {
        "code": "+1 869",
        "name": "Nevis"
      },
      {
        "code": "+687",
        "name": "New Caledonia"
      },
      {
        "code": "+64",
        "name": "New Zealand"
      },
      {
        "code": "+505",
        "name": "Nicaragua"
      },
      {
        "code": "+227",
        "name": "Niger"
      },
      {
        "code": "+234",
        "name": "Nigeria"
      },
      {
        "code": "+683",
        "name": "Niue"
      },
      {
        "code": "+672",
        "name": "Norfolk Island"
      },
      {
        "code": "+850",
        "name": "North Korea"
      },
      {
        "code": "+1 670",
        "name": "Northern Mariana Islands"
      },
      {
        "code": "+47",
        "name": "Norway"
      },
      {
        "code": "+968",
        "name": "Oman"
      },
      {
        "code": "+92",
        "name": "Pakistan"
      },
      {
        "code": "+680",
        "name": "Palau"
      },
      {
        "code": "+970",
        "name": "Palestinian Territory"
      },
      {
        "code": "+507",
        "name": "Panama"
      },
      {
        "code": "+675",
        "name": "Papua New Guinea"
      },
      {
        "code": "+595",
        "name": "Paraguay"
      },
      {
        "code": "+51",
        "name": "Peru"
      },
      {
        "code": "+63",
        "name": "Philippines"
      },
      {
        "code": "+48",
        "name": "Poland"
      },
      {
        "code": "+351",
        "name": "Portugal"
      },
      {
        "code": "+1 787",
        "name": "Puerto Rico"
      },
      {
        "code": "+974",
        "name": "Qatar"
      },
      {
        "code": "+262",
        "name": "Reunion"
      },
      {
        "code": "+40",
        "name": "Romania"
      },
      {
        "code": "+7",
        "name": "Russia"
      },
      {
        "code": "+250",
        "name": "Rwanda"
      },
      {
        "code": "+685",
        "name": "Samoa"
      },
      {
        "code": "+378",
        "name": "San Marino"
      },
      {
        "code": "+966",
        "name": "Saudi Arabia"
      },
      {
        "code": "+221",
        "name": "Senegal"
      },
      {
        "code": "+381",
        "name": "Serbia"
      },
      {
        "code": "+248",
        "name": "Seychelles"
      },
      {
        "code": "+232",
        "name": "Sierra Leone"
      },
      {
        "code": "+65",
        "name": "Singapore"
      },
      {
        "code": "+421",
        "name": "Slovakia"
      },
      {
        "code": "+386",
        "name": "Slovenia"
      },
      {
        "code": "+677",
        "name": "Solomon Islands"
      },
      {
        "code": "+27",
        "name": "South Africa"
      },
      {
        "code": "+500",
        "name": "South Georgia and the South Sandwich Islands"
      },
      {
        "code": "+82",
        "name": "South Korea"
      },
      {
        "code": "+34",
        "name": "Spain"
      },
      {
        "code": "+94",
        "name": "Sri Lanka"
      },
      {
        "code": "+249",
        "name": "Sudan"
      },
      {
        "code": "+597",
        "name": "Suriname"
      },
      {
        "code": "+268",
        "name": "Swaziland"
      },
      {
        "code": "+46",
        "name": "Sweden"
      },
      {
        "code": "+41",
        "name": "Switzerland"
      },
      {
        "code": "+963",
        "name": "Syria"
      },
      {
        "code": "+886",
        "name": "Taiwan"
      },
      {
        "code": "+992",
        "name": "Tajikistan"
      },
      {
        "code": "+255",
        "name": "Tanzania"
      },
      {
        "code": "+66",
        "name": "Thailand"
      },
      {
        "code": "+670",
        "name": "Timor Leste"
      },
      {
        "code": "+228",
        "name": "Togo"
      },
      {
        "code": "+690",
        "name": "Tokelau"
      },
      {
        "code": "+676",
        "name": "Tonga"
      },
      {
        "code": "+1 868",
        "name": "Trinidad and Tobago"
      },
      {
        "code": "+216",
        "name": "Tunisia"
      },
      {
        "code": "+90",
        "name": "Turkey"
      },
      {
        "code": "+993",
        "name": "Turkmenistan"
      },
      {
        "code": "+1 649",
        "name": "Turks and Caicos Islands"
      },
      {
        "code": "+688",
        "name": "Tuvalu"
      },
      {
        "code": "+1 340",
        "name": "U.S. Virgin Islands"
      },
      {
        "code": "+256",
        "name": "Uganda"
      },
      {
        "code": "+380",
        "name": "Ukraine"
      },
      {
        "code": "+971",
        "name": "United Arab Emirates"
      },
      {
        "code": "+44",
        "name": "United Kingdom"
      },
      {
        "code": "+1",
        "name": "United States"
      },
      {
        "code": "+598",
        "name": "Uruguay"
      },
      {
        "code": "+998",
        "name": "Uzbekistan"
      },
      {
        "code": "+678",
        "name": "Vanuatu"
      },
      {
        "code": "+58",
        "name": "Venezuela"
      },
      {
        "code": "+84",
        "name": "Vietnam"
      },
      {
        "code": "+1 808",
        "name": "Wake Island"
      },
      {
        "code": "+681",
        "name": "Wallis and Futuna"
      },
      {
        "code": "+967",
        "name": "Yemen"
      },
      {
        "code": "+260",
        "name": "Zambia"
      },
      {
        "code": "+255",
        "name": "Zanzibar"
      },
      {
        "code": "+263",
        "name": "Zimbabwe"
      }
    ]
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  

  return (
    <>
      {!disotp&&
       <Box className="flex h-3/4 w-full justify-center mt-10">

              <div className="flex flex-col">
                <div>
                  <Text className="text-gray-400" 
                  fontSize={"xx-large"}>Enter the Phone Number</Text>
                  <Text className="text-gray-400">Select a Country and enter Your WhatsApp phone number.</Text>
                </div>

                <div className="mt-8 flex flex-col gap-3 items-center">
                    
                    <Menu>
                          <MenuButton  >
                          <Box border={'1px solid gray'} 
                    borderRadius={"30px"} 
                    className="p-4 w-64 flex items-center ">
                           <Text>{Countryname}</Text>
                           <Box ml={'auto'}><IoMdArrowDropdown/></Box>

                    </Box>
                          </MenuButton>
                          <MenuList maxH={"300px"} overflowY={'auto'} className="no-scrollbar p-4">
                              <Input
          placeholder="Search for a country"
          value={searchQuery}
          onChange={handleSearchChange}
          mb={4}
        />
                                  {filteredCountries.map((item, index) => (
          <MenuItem
            key={index}
            className="flex items-center gap-3"
            p={2}
            onClick={() => {
              setCountrycode(item.code);
              setCountryname(item.name);
            }}
          >
            <Text>{item.name}</Text>
            <Text ml={'auto'}>{item.code}</Text>
          </MenuItem>
        ))}
                          </MenuList>
                     </Menu>
                     <div id="recaptcha-container" />
                    <Box border={'1px solid gray'} 
                    borderRadius={"30px"} 
                    w={'260px'}
                    p={2} className="flex gap-0 items-center">

                    <Text w={'80px'}>{Countrycode}</Text>
                    <Input 
                    value={phoneNumber}
                    type="number"
                    border={'transparent'}
                    _focus={{ boxShadow: 'none', outline: 'none', border: 'none' }}
                    onChange={(e)=>setPhoneNumber(e.target.value)}
                    />
                    </Box>
                   {error&&<Text className="text-red-700">Invalid Phone Number</Text>}
                    <Button colorScheme="teal" w={'70px'} borderRadius={'20px'}
                    onClick={getotp}
                    >Next</Button>

                    <Text color={'teal'} onClick={()=>setlogin_num(false)} cursor={'pointer'}>Link with Qr code</Text>
                      
                    
                           

                   

                </div>

              </div>                    
       </Box>
}
{disotp&&
       <Box className="flex flex-col items-center mt-48">

            <Flex justify="center" gap={4}>
                  {otp.map((value, index) => (
                    <Input
                      key={index}
                      type="text"
                      width={12}
                      maxLength={1}
                      value={value}
                      border={"1px solid gray"}
                      onChange={(e) => handleInput(e, index)}
                      ref={(input) => (inputRefs.current[index] = input)}
                    />
                  ))}
          </Flex>
                <Button
                  colorScheme="teal"
                  mt={4}
                  onClick={verifyotpandlogin}
                  isDisabled={otp.join('').length !== otp.length}
                  w={'full'}
                >
                  Verify
                </Button>
               
       </Box>}

  </>

       );
}

export default NumberVerification;
{/* <div id="recaptcha-container" />
       
<button onClick={getotp}>Send OTP</button>

<Container height="100vh" display="flex" alignItems="center" justifyContent="center">
  <Box
    p={4}
    borderRadius="md"
    boxShadow="md"
  >
    <Box mb={4} textAlign="center">
      <Text>Enter Code</Text>
    </Box>
    <Flex justify="center" gap={4}>
      {otp.map((value, index) => (
        <Input
          key={index}
          type="text"
          width={12}
          maxLength={1}
          value={value}
          onChange={(e) => handleInput(e, index)}
          ref={(input) => (inputRefs.current[index] = input)}
        />
      ))}
    </Flex>
    <Button
      colorScheme="teal"
      mt={4}
      onClick={verifyotpandlogin}
      isDisabled={otp.join('').length !== otp.length}
    >
      Verify
    </Button>
  </Box>
</Container> */}
// </>
