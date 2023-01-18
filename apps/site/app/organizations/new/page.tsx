import { Form } from "./form";

const NewOrganizationPage = () => {
  return (
    <main className="">
      <div role="document" className="mx-auto mt-20 prose">
        <div className="max-w-5xl px-8 mx-auto">
          <h1>New Organization</h1>
        </div>
        <Form />
      </div>
    </main>
  );
};

export default NewOrganizationPage;
