function MoveButton({ children, className, dispatch, type }) {
  return (
    <button
      className={`btn btn-ui ${className}`}
      onClick={() => dispatch({ type })}
    >
      {children}
    </button>
  );
}

export default MoveButton;
