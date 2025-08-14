import * as yup from "yup";

// Cabin form schema
export const cabinSchema = yup.object({
  name: yup.string().required("Name is required"),
  maxCapacity: yup
    .number()
    .typeError("Must be a number")
    .required("Capacity is required")
    .min(1, "Capacity should be at least 1"),
  regularPrice: yup
    .number()
    .typeError("Must be a number")
    .required("Price is required")
    .min(50, "Price should start at least from 50"),
  discount: yup
    .number()
    .typeError("Must be a number")
    .max(yup.ref("regularPrice"), "Discount should be less than regular price"),
  description: yup.string().required("Description is required"),
  image: yup
    .mixed()
    .test("fileRequired", "Image is required", function (value) {
      // Required only if not in edit mode
      if (this.options.context?.isEditSession) return true;
      return value && value.length > 0;
    }),
});

// Password update schema
export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .required("This field is required")
    .min(8, "Password needs a minimum of 8 characters"),
  passwordConfirm: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password")], "Passwords need to match"),
});

// User update schema
export const userSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),
  avatar: yup
    .mixed()
    .nullable()
    .test("fileSize", "The file is too large", (value) => {
      if (!value || value.length === 0) return true;
      return value[0].size <= 2 * 1024 * 1024; // 2MB
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (!value || value.length === 0) return true;
      return ["image/jpeg", "image/png", "image/webp"].includes(value[0].type);
    }),
});

// sign-up schema
export const signupSchema = yup.object().shape({
  fullName: yup.string().required("Full name field is required"),
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required("Email field is required"),
  password: yup
    .string()
    .min(8, "Password needs a minimum of 8 characters")
    .required("Password field is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords need to match")
    .required("Password confirmation is required"),
});
