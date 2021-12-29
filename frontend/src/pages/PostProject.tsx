import { Button, TextField } from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import * as React from "react";
import { MyField } from "../components/FormField";

interface Values {
    projName: string;
    description: string;
    stack: string;
    repoLink: string;
}

interface Props {
    onSubmit: (values: Values) => void;
}

export const MyForm: React.FC<Props> = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={{ projName: "", description: "", stack: "", repoLink: "" }}
            onSubmit={values => {
                onSubmit(values);
            }}
        >
            {({ values }) => (
                <Form>
                    <div>
                        <Field
                            name="projName"
                            placeholder="Hotdog Not Hotdog"
                            component={MyField}
                        />
                    </div>
                    <div>
                        <Field
                            name="description"
                            placeholder="Determines if picture is of a hotdog"
                            component={MyField}
                        />
                    </div>
                    <div>
                        <Field
                            name="stack"
                            placeholder="Python, TypeScript, C"
                            component={MyField}
                        />
                    </div>
                    <div>
                        <Field
                            name="repoLink"
                            placeholder="github.com/user/reponame"
                            component={MyField}
                        />
                    </div>
                    <Button type="submit">Submit</Button>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                </Form>
            )}
        </Formik>
    );
};