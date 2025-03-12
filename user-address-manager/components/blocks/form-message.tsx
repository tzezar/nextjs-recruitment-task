interface FormFlashMessageProps {
    state?: {
      message?: string;
      issues?: string[];
    };
  }
  
  export default function FormFlashMessage({ state }: FormFlashMessageProps) {
    return (
      <>
        {state?.message && !state?.issues && (
          <div
            className={`${
              typeof state.message === 'string' && state.message.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {state.message}
          </div>
        )}
  
        {state?.issues && (
          <div className="text-red-500">
            <ul>
              {state.issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }
  