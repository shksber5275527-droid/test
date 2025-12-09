import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../../context/AuthContext";
import "./form.css";

// Validation schema
const registerSchema = z.object({
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .trim(),
  email: z
    .string()
    .email("Invalid email address")
    .trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 charecters")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])/,
     "Password must contain at least 8 characters, 1 letter,1 number, and 1 speacial character"
    ),
});

type RegisterFields = z.infer<typeof registerSchema>;

const Registerform = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFields>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFields> = async (data) => {
    try {
      const res = await registerUser(data.userName, data.email, data.password);

      if (res.success) {
        navigate("/home");
      } else {
        setError("root", {
          message: res.error || "Registration failed due to network",
        });
      }
    } catch (err) {
      setError("root", {
        message: "An unexpected error ocurred",
      });
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Signup</h1>

        <div className="input-Box">
          <input
            type="text"
            placeholder="userName"
            disabled={isSubmitting}
            {...register("userName")}
          />
          {errors.userName && <span>{errors.userName.message}</span>}
        </div>

        <div className="input-Box">
          <input
            type="email"
            placeholder="email"
            disabled={isSubmitting}
            {...register("email")}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="input-Box">
          <input
            type="password"
            placeholder="password"
            disabled={isSubmitting}
            {...register("password")}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        {errors.root && (
          <div className="input-Box">
            <span>{errors.root.message}</span>
          </div>
        )}

        <div className="submit-Btn">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <ClipLoader size={20} /> : "Signup"}
          </button>
        </div>

        <div className="register-Link">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Registerform;