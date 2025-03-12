interface FormFlashMessageProps {
  state?: {
    message?: string;
    issues?: string[];
  };
}

export default function FormFlashMessageExtra({
  state,
}: FormFlashMessageProps) {
  return (
    <>
      {typeof state?.message === "string" &&
        state.message.includes("successfully") && (
          <div className="text-red-500">
            During this task, I encountered multiple bugs in ShadCN UI, such as:
            https://github.com/shadcn-ui/ui/issues/468
            https://github.com/radix-ui/primitives/issues/1836#issuecomment-1674338372
            I was able to fix some of the issues, but there is still a problem
            where clicking on anything becomes impossible after submitting the
            form. This issue seems to be related to focus management with
            multiple popovers. However, resolving third-party issues is outside
            the scope of this task, so I am leaving it as is, sorry :p
          </div>
        )}
    </>
  );
}
