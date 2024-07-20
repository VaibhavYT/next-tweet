import React, { useState, useCallback } from "react";

import Input from "../Input";
import Modal from "../Modal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    loginModal.onOpen();
    registerModal.onClose();
  }, [isLoading, loginModal, registerModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.post("/api/register", {
        email,
        password,
        name,
        username,
      });

      toast.success("Account Created Successfully");

      signIn("credentials", {
        email,
        password,
      });

      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, password, username, name]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onchange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        onchange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="username"
        onchange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="password"
        onchange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <p className="">
        Already have an account?
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          {" "}
          Sign In
        </span>
      </p>
    </div>
  );

  return (
    <div>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Create an account"
        actionLabel="Register"
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default RegisterModal;