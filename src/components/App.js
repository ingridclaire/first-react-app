import TodoList from './TodoList';
import { Navbar, NavbarBrand } from 'reactstrap';
import styles from './styles/App.module.css';

function App() {
  const headerTitle = "Todoifier";

  // is there a particular reason for needing a function to return the navbar? You can also just put directly in JSX with the props that are needed
  function headerDisplay(title) {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">{title}</NavbarBrand>
      </Navbar>
    );
  }

  return (
    <div className={styles.app}>
      {/* {headerDisplay(headerTitle)} */}
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">{headerTitle}</NavbarBrand>
      </Navbar>
      <br />
      <TodoList />
    </div>
  );
}

export default App;