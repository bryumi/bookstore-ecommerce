const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="font-sans text-[10px] text-burgundy tracking-wide mt-1">
      {message}
    </p>
  ) : null;

export default FieldError;
