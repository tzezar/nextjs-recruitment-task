I approached this task as an opportunity to learn something new, so I decided to give ShadCN UI a try. Unfortunately, I ran into a few tricky bugs while implementing the features. I also considered using Tanstack Table and Tanstack Query, but the scale of the project was too small for that to be necessary.

I wasn't entirely sure about the task creator's intentions regarding how to render the paginated users' addresses list after selecting a user. To solve this, I decided to implement the list in a drawer, as it seemed like a good solution to display the information in a clear and accessible way.

During the task, I encountered several bugs in ShadCN UI, such as:

https://github.com/shadcn-ui/ui/issues/468

https://github.com/radix-ui/primitives/issues/1836#issuecomment-1674338372

I was able to fix some of these issues, but there's still one remaining problem: after submitting the form, clicking anything becomes impossible. This seems to be related to focus management when dealing with multiple popovers. Since resolving third-party issues is outside the scope of this task, I’m leaving it as is for now. Apologies for the inconvenience! 😅


## Task

Create a NextJS application which allows you to manage users' addresses. The database schema with sample records is provided for you, you can set it up by running:

```bash
docker compose up
```

## UI Requirements

1. The UI should only include what's required in task's description. There is no need to build authentication, menus or any features besides what's required.
2. The UI should consist of:
- A paginated users' list. Add a mocked button to **Create** a new user above the list and in each record, a context menu with mocked **Edit** and **Delete** buttons.
- A paginated users' addresses list. The list should be visible after clicking a user record in the users' list.
- In the addresses list, include a context menu where you can **Edit** and **Delete** an address record.
- Add the ability to **Create** a new user address. 
- **Create** and **Edit** forms should be implemented in modals.
- When inputting address fields, display a preview of the full address in the realtime in the following format:
```
<street> <building_number>
<post_code> <city>
<country_code>
```
3. You may use any UI library: MUI, AntD, etc.
4. Handle data validation errors coming from the server.

## Server Requirements

1. Use the database schema provided. Do not modify it.
2. Implement ["Server Actions"](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) which the frontend should use to interact with the database.
3. You may use any ORM or Query Builder.
4. Introduce simple data validation. Nothing fancy, you can use constraints from the database schema. Country codes use ISO3166-1 alpha-3 standard.

## General Requirements

1. Expect the application to eventually include many similar CRUD components (i.e. "users_tasks", "users_permissions", etc.), make your code modular, extensible and generic so that similar modules can be developed with less overhead.
2. Keep the code clean, scalable, follow known conding conventions, paradigms, patterns, etc.
3. Use TypeScript.
4. You do not have to deploy the application, but prepare the codebase for deployment to an environment of your choice.
