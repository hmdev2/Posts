import './styles.css';

export const TestInput = ({ searchValue, handleChange }) => {
    return (
      <input
        className='text-input'
        onChange={handleChange}
        value={searchValue}
        type='search'
        placeholder='Type your search'
      />
    );
};