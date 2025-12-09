import React, { useState } from "react";
import "./form.css";
import { Link, useNavigate } from "react-router";
import type { LoginInfo } from "../../types/auth.model";
import { useAuth } from "../../context/AuthContext";
import { ClipLoader } from "react-spinners";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").trim(),
  password: z.string().min(8, "password is requried"),
});
type LoginFields = z.infer<typeof loginSchema>;
const Loginform = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit: SubmitHandler<LoginFields> = async (data) => {
    try {
      const res = await login(data.email, data.password);
      if (res.success) {
        navigate("/home");
      } else {
        setError("root", {
          message: res.error || "Login failed due to network",
        });
      }
    } catch (error) {
      setError("root", {
        message: "An unexpected error occurred",
      });
    }
  };

  return (
    <>
      <div className="wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Login</h1>
          <div className="input-Box">
            <input
              disabled={isSubmitting}
              type="text"
              placeholder="email"
              {...register("email")}
            />
          </div>
          {errors.email && <span>{errors.email.message}</span>}
          <div className="input-Box">
            <input
              disabled={isSubmitting}
              type="password"
              placeholder="password"
              {...register("password")}
            />
            {errors.password && <span>{errors.password.message} </span>}
            <span>{errors.root?.message}</span>
          </div>

          <div className="submit-Btn">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <ClipLoader size={20} /> : "Login"}
            </button>
          </div>
          <div className="register-Link">
            <p>
              Dont have an account ? <Link to="/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Loginform;
