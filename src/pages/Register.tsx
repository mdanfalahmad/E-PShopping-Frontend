import { FormEvent, useState } from "react";
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setError("");

    if (!name || !email || !role || password.length < 6) {
      setError("Complete all fields and use a password with at least 6 characters.");
      return;
    }

    setIsLoading(true);
    const response =await fetch("http://localhost:5000/api/auth/register",{
        method : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
        });
    setIsLoading(false);
  };

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  return (
    <Box className="login-page">
      <Box className="login-brand-mark">
        <LocalShippingOutlinedIcon />
        <Typography variant="h6">Shiply</Typography>
      </Box>
      <Paper className="login-shell" elevation={0}>
        <Box className="login-promo">
          <Box className="promo-badge"><LocalShippingOutlinedIcon /> Shipping made simple</Box>
          <Typography className="promo-title" variant="h1">Move what matters.</Typography>
          <Typography className="promo-copy">
            Track every delivery, manage your orders, and keep your business moving from one calm dashboard.
          </Typography>
          <Box className="promo-points">
            <Box><CheckCircleOutlineIcon /><span>Real-time delivery updates</span></Box>
            <Box><CheckCircleOutlineIcon /><span>Trusted by 20,000+ businesses</span></Box>
          </Box>
          <Typography className="promo-footnote">Fast routes. Clear updates. Better deliveries.</Typography>
        </Box>

        <Box className="login-form-wrap">
          <Box component="form" className="login-form" onSubmit={handleRegister} noValidate>
            <Box className="form-icon"><PersonAddAltOutlinedIcon /></Box>
            <Typography className="form-kicker">Get started</Typography>
            <Typography className="form-title" variant="h2">Create your account</Typography>
            <Typography className="form-subtitle">Join Shiply and keep every delivery moving.</Typography>

            {error && <Alert severity="error" className="login-alert">{error}</Alert>}
            <TextField
              label="Full name"
              fullWidth
              required
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              error={submitted && !name}
              helperText={submitted && !name ? "Name is required" : " "}
            />
            <TextField
              label="Email address"
              type="email"
              fullWidth
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={submitted && !email}
              helperText={submitted && !email ? "Email is required" : " "}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              error={submitted && password.length > 0 && password.length < 6}
              helperText={submitted && password.length > 0 && password.length < 6 ? "Use at least 6 characters" : " "}
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end"><IconButton aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} edge="end">{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton></InputAdornment>,
                },
              }}
            />
            <FormControl fullWidth required error={submitted && !role} className="register-role-field" sx={{marginBottom: 2}}>
              <InputLabel id="role-label">Role</InputLabel>
              <Select labelId="role-label" value={role} label="Role" onChange={handleRoleChange}>
                <MenuItem value="customer">Customer</MenuItem>
                <MenuItem value="business">Business owner</MenuItem>
                <MenuItem value="admin">Administrator</MenuItem>
              </Select>
              {submitted && !role && <Typography className="register-field-error">Role is required</Typography>}
            </FormControl>
            <Button type="submit" variant="contained" fullWidth className="login-button" disabled={isLoading} endIcon={!isLoading && <ArrowForwardIcon />}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
            <Typography className="signup-prompt">Already have an account? <Link href="/" underline="hover">Sign in</Link></Typography>
          </Box>
        </Box>
      </Paper>
      <Typography className="login-legal">By creating an account, you agree to Shiply&apos;s Terms of Service and Privacy Policy.</Typography>
    </Box>
  );
}

export default Register;