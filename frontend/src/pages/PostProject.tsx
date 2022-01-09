import { Button, TextField } from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import * as React from "react";
import internal from "stream";
import { MyField } from "../components/FormField";
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';

interface Values {
    projName: string;
    description: string;
    stack: string;
    repoLink: string;
    collabStatus: string;
}

interface Props {
    onSubmit: (values: Values) => void;
}

function PostProject(this: any) {

    const history = useNavigate();
    const auth = useAuth();
    const authToken = auth.getAuthData().authToken;
    const authData = auth.getAuthData().authData;
    
    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const form = event.target as HTMLFormElement;
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}/api/postproject`,
            headers: {
                "Content-Type": "application/json",
                "authorization": authToken
            },
            data: {
                projName: form.projName.value,
                description: form.description.value,
                stack: form.stack.value,
                repoLink: form.repoLink.value,
                collabStatus: form.collabStatus.value,
            },
        });
    };
};


export const MyForm: React.FC<Props> = ({ onSubmit }) => {
    return (
        <Formik
            initialValues={{ projName: "", description: "", stack: "", repoLink: "", collabStatus: "" }}
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
                    <div>
                        <Field
                            name="collabStatus"
                            placeholder="True/False"
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

export default PostProject;