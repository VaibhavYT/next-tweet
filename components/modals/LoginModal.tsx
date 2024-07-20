import React, { useState, useCallback } from "react";

import Input from "../Input";
import Modal from "../Modal";

import { signIn } from "next-auth/react";
import useLoginModal from "../../hooks/useLoginModal";
import useRegisterModal from "../../hooks/useRegisterModal";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const LoginModal = useLoginModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    registerModal.onOpen();
    loginModal.onClose();
  }, [isLoading, loginModal, registerModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await signIn("credentials", {
        email,
        password,
      });

      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, email, password]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="email"
        onchange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
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
        Don&apos;t have an account?
        <span
          className="text-white cursor-pointer hover:underline"
          onClick={onToggle}
        >
          {" "}
          Sign Up
        </span>
      </p>
    </div>
  );

  return (
    <div>
      <Modal
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Sign In"
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    </div>
  );
};

export default LoginModal;