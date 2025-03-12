I approached this task as an opportunity to learn something new, so I decided to give ShadCN UI a try. Unfortunately, I ran into a few tricky bugs while implementing the features. I also considered using Tanstack Table and Tanstack Query, but the scale of the project was too small for that to be necessary.

I wasn't entirely sure about the task creator's intentions regarding how to render the paginated users' addresses list after selecting a user. To solve this, I decided to implement the list in a drawer, as it seemed like a good solution to display the information in a clear and accessible way.

During the task, I encountered several bugs in ShadCN UI, such as:

https://github.com/shadcn-ui/ui/issues/468

https://github.com/radix-ui/primitives/issues/1836#issuecomment-1674338372

I was able to fix some of these issues, but there's still one remaining problem: after submitting the form, clicking anything becomes impossible. This seems to be related to focus management when dealing with multiple popovers. Since resolving third-party issues is outside the scope of this task, I’m leaving it as is for now. Apologies for the inconvenience! 😅
