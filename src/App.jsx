import { useState, useCallback, useEffect, useRef } from 'react' //hooks


function App() {

  // useState hook
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)


  // useCallback hook
  const passGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)



  }, [length, numberAllowed, charAllowed, setPassword]) //these are dependencies
  // useCallback memorize the function
  // here we are talking about optimization, means if anything is changes in these dependencies and method is running again then optimize it(it will store in the chache memory).
  //it will work also if we don't use setPassword
  // if we use "passsword" only instead of setPassword it will go into infinite loop and random password will change automatically

// passGenerator() // we can't call like this bcz we use useCallback

  const copyPasswordToClipboard = useCallback(() =>{
   
    passwordRef.current?.select(); // when clicking on copy buuton then it will copt and select text  
    // passwordRef.current?.setSelectionRange(0,5); // it will select only until five character 
    window.navigator.clipboard.writeText(password) // copying to clipboard
  }, [password])



  // useEffect hook
  useEffect(() =>{
    passGenerator()
  }, [length, numberAllowed, charAllowed, passGenerator]) // dependencies
  // whenever our page is load then firstly useEffect is called or
  //if anything is changes in these dependencies ([length, numberAllowed, charAllowed, passGenerator]) then it will  re-run (it will done automatically)



  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg 
      px-4 py-5 my-10 bg-gray-600'>
        <h1 className='text-white text-center my-3'>password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className='outline-none w-full py-2 px-3 '
            placeholder='password'
            readOnly
            ref={passwordRef} //passing reference
          />

          <button 
            onClick={copyPasswordToClipboard}
            className='outline-none bg-green-600 hover:bg-green-800 text-white px-5 py-0.5 shrink-0 '
          >Copy</button>
        </div>

        
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1 '>
            <input
              type="range"
              min={6}
              max={70}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setlength(e.target.value) }} // when range is changing it will create random pass acc. to range
            />
            <label className='text-white mx-3'> length : {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={(e) => {
                setNumberAllowed((prev) => !prev); 
                //!prev it will cahnge true / false, it means if prev is true then !prev is false
              }}
            />
            <label htmlFor='numberInput' className='text-white'> Numbers </label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={(e) => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='characterInput' className='text-white'> Characters </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
