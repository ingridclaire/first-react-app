import TodoList from './TodoList';
import { Navbar, NavbarBrand } from 'reactstrap';
import styles from './styles/App.module.css';

function App() {
  const headerTitle = "Todoifier";

  function headerDisplay(title) {
    return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">{title}</NavbarBrand>
    </Navbar>
    );
  }

  return (
    <div className={styles.app}>
      {headerDisplay(headerTitle)}
      <br />
      <TodoList />
    </div>
  );
}

export default App;