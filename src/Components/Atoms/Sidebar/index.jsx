import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isOpen} onChange={toggleSidebar} />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">
          {isOpen ? 'Close drawer' : 'Buka SideBar'}
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className={`drawer-overlay ${isOpen ? 'drawer-overlay-active' : ''}`} onClick={toggleSidebar}></label>
        <ul className={`menu p-4 w-80 min-h-100 bg-base-200 text-base-content ${isOpen ? 'drawer-active' : ''}`} style={{ marginTop: isOpen ? '88px' : '0' }}>
          {/* Sidebar content here */}
          <li><a href="#">Sidebar Item 1</a></li>
          <li><a href="#/products/favorit">Sidebar Item 2</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
