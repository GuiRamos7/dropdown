import React, { useState, useEffect } from 'react';

/*
Prompt:
  We have defined a basic dropdown via the Dropdown and DropdownItem components below, with example usage
  in the ExampleNav component. The Dropdown and DropdownItem components have some problems, and also 
  have room for improvements (doesn't everything?) A couple items TODO here (make sure to explain with comments!)
  
  0. How are you today? 😊 
  - Im good, and you?

  1. Please fix any obvious issues you see with the dropdown and then save your gist.

  2. Please then make improvements to the dropdown and then save your gist again.

  - Use functional components and use React hooks

  3. Consider the different ways that this dropdown might be used and what changes would
     be neccessary to make it more flexible.

  4. If we wanted a server with this hypothetial "syncing library"
     `app.sync('PATCH', 'users/'+app.USER.id, { dropdown_1_state: {true,false} })` whe to sync the dropdown selection tore would this be included? Should
     the state be read again from the server to show the dropdown open/closed on page load?

  5. If we wanted to pass children (like this example) OR a Promise that resolves to an array of items
     what changes should be made? (just a sentence or two or some code is ok).

  - I use JSON Server to run a fake API, to get the date a make a request.
  
  PS: No need to worry about CSS or about making it actually run.

*/

const DropdownItem = ({ children, icon }) => {
  return (
    <li>
      {icon && <i>{icon}</i>} {children}
    </li>
  );
};

const Dropdown = ({ children, label, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='dropdown'>
      <button
        type='button'
        className='dropdown-button'
        id='dropdownButton'
        aria-haspopup='true'
        aria-expended={isOpen}
        onClick={toggle}
      >
        {label}
      </button>

      {isOpen && (
        <ul
          className={`${isOpen ? 'dropdown-open' : ''} dropdown-menu`}
          aria-labelledby='dropdownButton'
          role='menu'
        >
          {children}
        </ul>
      )}
    </div>
  );
};

const listOne = [
  { item: 'Chocolate', icon: '🍫' },
  { item: 'Banana', icon: '🍌' },
  { item: 'Strawberry', icon: '🍓' },
  { item: 'Ice Cream', icon: '🍨' },
];

const ExampleNav = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3333/travelPlaces')
      .then((res) => res.json())
      .then((el) => {
        setItems(el);
      });
  }, []);

  return (
    <nav>
      <Dropdown label='More items'>
        <DropdownItem href='/page2'>Page 2</DropdownItem>
        <DropdownItem href='/page3'>Page 3</DropdownItem>
        <DropdownItem href='/page4'>Page 4</DropdownItem>
      </Dropdown>

      <Dropdown label='With dropdown inside'>
        <DropdownItem href='/page2'>
          <Dropdown label='More items'>
            <DropdownItem href='/page2'>Page 2.1</DropdownItem>
            <DropdownItem href='/page3'>Page 2.2</DropdownItem>
            <DropdownItem href='/page4'>Page 2.3</DropdownItem>
          </Dropdown>
        </DropdownItem>
        <DropdownItem href='/page3'>Page 3</DropdownItem>
        <DropdownItem href='/page4'>Page 4</DropdownItem>
      </Dropdown>

      <Dropdown label='With Icon'>
        {listOne.map((el) => (
          <DropdownItem key={el.item} icon={el.icon} href='/page2'>
            {el.item}
          </DropdownItem>
        ))}
      </Dropdown>

      <Dropdown label='By a request'>
        {items.length > 0
          ? items.map((el) => (
              <DropdownItem key={el.id} icon={el.icon} href='/page2'>
                {el.name}
              </DropdownItem>
            ))
          : 'No item found'}
      </Dropdown>
    </nav>
  );
};

export default ExampleNav;
