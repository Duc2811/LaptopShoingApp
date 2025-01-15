export const validateRegistration = (
    userName: string,
    email: string,
    password: string,
    confirmPassword: string,
    phone: string,
    address: string
): { valid: boolean; message?: string } => {
    // Check if all fields are filled
    if (!userName || !email || !password || !confirmPassword || !phone || !address) {
        return { valid: false, message: "Please fill in all required fields." };
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, message: "Please enter a valid email address." };
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return { valid: false, message: "Passwords do not match." };
    }

    // Validate password complexity
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return {
            valid: false,
            message: "Password must be at least 8 characters long, include at least 1 letter, 1 number, and 1 special character.",
        };
    }

    // Validate phone number (digits only, optional length check)
    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(phone)) {
        return { valid: false, message: "Phone number must contain only digits and be 10 to 15 characters long." };
    }

    // Ensure userName is not empty or whitespace
    if (!userName.trim()) {
        return { valid: false, message: "User Name must not be empty or whitespace." };
    }

    return { valid: true };
};
