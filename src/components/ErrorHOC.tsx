const ErrorHOC = (props: any) => {
  return <span className="red-text error">{props.children}</span>;
};
export default ErrorHOC;
