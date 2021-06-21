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
  return (
    <header>
      <img src="./logo.svg" alt="logo"></img>
      <ul>
        <li onPointerOver={(e) => {
          setIsOpen(true);
          setTitle("Products");
          setItems(["Payment","Terminal","Connect"]);
          const rect = e.target.getBoundingClientRect();
          const left = (rect.left + rect.right )/ 2
          submenu.current.style.left = left + "px";
          }}  onPointerLeave={() => setIsOpen(false)}>Products</li>
        <li onPointerEnter={(e) => {
          setIsOpen(true);
          setTitle("Developers");
          setItems(["Payment","Terminal","Connect"])
          const rect = e.target.getBoundingClientRect();
          const left = (rect.left + rect.right )/ 2
          submenu.current.style.left = left + "px";
          }} onPointerLeave={() => setIsOpen(false)}>Developers</li>
        <li onPointerEnter={(e) => {
          setIsOpen(true);
          setTitle("Company");
          setItems(["Payment","Terminal","Connect"])
          const rect = e.target.getBoundingClientRect();
          const left = (rect.left + rect.right )/ 2
          submenu.current.style.left = left + "px";
          }} onPointerLeave={() => setIsOpen(false)}>Company</li>
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
  const [isOpen,setIsOpen] = useState(true);
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
