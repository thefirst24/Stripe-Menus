import { useContext, useState,createContext, useRef } from 'react';
import './App.scss';



const Submenu = () => {
  const {title,items,isOpen,submenu,setIsOpen} = useContext(AppContext);
  return (
    <div onPointerEnter={() => setIsOpen(true)} ref={submenu} className={"submenu" + (isOpen ? " submenu-show" : '')}>
        <h3 className="submenu-title">{title}</h3>
        <ul className="submenu-list">
          {items.map(item => <li key={Math.random() * 10}>{item}</li>)}
        </ul>
      </div>
  )
}



const Header = () => {
  const {setIsOpen,setTitle,setItems,submenu} = useContext(AppContext);

  const onPointerOverHandler = (title,items,e) => {
    setIsOpen(true);
    setTitle(title);
    setItems(items);
    const rect = e.target.getBoundingClientRect();
    const middle = (rect.left + rect.right )/ 2
    submenu.current.style.left = middle + "px";
  }

  return (
    <header>
      <img src="./logo.svg" alt="logo"></img>
      <ul>
        <li onPointerOver={(e) => onPointerOverHandler("Products",["Payment","Terminal","Connect"],e)}  
          onPointerLeave={() => setIsOpen(false)}>
            Products
        </li>
        <li onPointerOver={(e) => onPointerOverHandler("Developers",["Plugins","Libraries","Help","Billing"],e)}  
          onPointerLeave={() => setIsOpen(false)}>
            Developers
        </li>
        <li onPointerOver={(e) => onPointerOverHandler("Company",["About","Customers"],e)}  
          onPointerLeave={() => setIsOpen(false)}>
            Company
        </li>
      </ul>
      <button className="btn">Sign in</button>
    </header>
  )
}

const Main = () => {
  const {setIsOpen} = useContext(AppContext);
  return (
    <main onMouseEnter={() => setIsOpen(false)}>
      <article>
        <h1>Payments <br></br> infrastructure <br></br>  for the internet</h1>
        <p>Millions of companies of all sizes—from startups to Fortune 500s—use Stripe’s software and APIs to accept payments, send payouts, and manage their businesses online.</p>
        <button className="btn">Start now</button>
      </article>
      <img src="phone.svg" alt="phone"></img>
    </main>
  )
}

function App() {
  const [title,setTitle] = useState("title");
  const [items,setItems] = useState([]);
  const [isOpen,setIsOpen] = useState(false);
  const submenu = useRef(null);
  return (
    <AppContext.Provider value={{title,items,setIsOpen,isOpen,setTitle,submenu,setItems}}>
      <Header />
      <Main />
      <Submenu ref={submenu}/>
    </AppContext.Provider>
  );
}

const AppContext = createContext(App);

export default App;
