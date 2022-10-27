import React, { FormEvent } from "react";
import { Input, InputLabel, VerticalInputGroup } from "../../components/Input";
import { TitleBar } from "../../components/TitleBar";
import { signUp } from "../../core/supabase";
import { ACCOUNT_VAULT_TYPE, validatePassphrases } from "../../data/passphrase";
import { hideModal, showModal } from "../ModalStack";

export async function createNewVault(): Promise<string> {
    return new Promise((resolve) => {
        showModal(
            <CreateAccount
                onCreated={(type: string) => {
                    hideModal();
                    resolve(type);
                }}
            />
        );
    });
}

type CreateAccountProps = {
    onCreated: (type: string) => void;
};

export class CreateAccount extends React.Component<CreateAccountProps> {
    private emailRef_ = React.createRef<HTMLInputElement>();
    private passwordRef1_ = React.createRef<HTMLInputElement>();
    private passwordRef2_ = React.createRef<HTMLInputElement>();
    render() {
        return (
            <div className="w-screen h-screen flex flex-col">
                <TitleBar title="Create Account" />
                <div className="flex flex-col justify-center items-center grow">
                    <form
                        className="px-4 flex flex-col w-full"
                        onSubmit={this.onSubmit_}
                    >
                        <div className="mb-2 daisy-form-control">
                            <InputLabel>Email</InputLabel>
                            <Input
                                inputRef={this.emailRef_}
                                type="email"
                                placeholder="Email"
                            />
                        </div>
                        <div className="mb-2 daisy-form-control">
                            <InputLabel>Master Passphrase</InputLabel>
                            <VerticalInputGroup>
                                <Input
                                    inputRef={this.passwordRef1_}
                                    type="password"
                                    placeholder="Passphrase"
                                />
                                <Input
                                    inputRef={this.passwordRef2_}
                                    type="password"
                                    placeholder="Confirm Passphrase"
                                />
                            </VerticalInputGroup>
                        </div>
                        <div className="flex flex-col items-center">
                            <input
                                type="submit"
                                value="Create Account"
                                className="daisy-btn"
                            ></input>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    onSubmit_ = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = this.emailRef_.current?.value;
        const passphrase1 = this.passwordRef1_.current?.value;
        const passphrase2 = this.passwordRef2_.current?.value;
        const errorMessage = validatePassphrases(passphrase1, passphrase2);
        if (errorMessage || !email) {
            // TODO: Handle error message
            // TODO: Validate email locally
            return;
        }
        await signUp(email, passphrase1!);
        this.props.onCreated(ACCOUNT_VAULT_TYPE);
    };
}