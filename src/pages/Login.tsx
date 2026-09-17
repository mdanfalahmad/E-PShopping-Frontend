import { FormEvent, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setError("");

    if (!email || !password || password.length < 6) {
      setError("Enter a valid email and a password with at least 6 characters.");
      return;
    }

    setIsLoading(true);
    window.setTimeout(() => setIsLoading(false), 900);
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
          <Box component="form" className="login-form" onSubmit={handleLogin} noValidate>
            <Box className="form-icon"><LockOutlinedIcon /></Box>
            <Typography className="form-kicker">Welcome back</Typography>
            <Typography className="form-title" variant="h2">Sign in to your account</Typography>
            <Typography className="form-subtitle">Manage your shipments from anywhere.</Typography>

            {error && <Alert severity="error" className="login-alert">{error}</Alert>}
            <TextField
              label="Email address"
              type="email"
              fullWidth
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={submitted && !email}
              helperText={submitted && !email ? "Email is required" : " "}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={submitted && password.length > 0 && password.length < 6}
              helperText={submitted && password.length > 0 && password.length < 6 ? "Use at least 6 characters" : " "}
              slotProps={{
                input: {
                  endAdornment: <InputAdornment position="end"><IconButton aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword(!showPassword)} edge="end">{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton></InputAdornment>,
                },
              }}
            />
            <Box className="form-options">
              <FormControlLabel control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />} label="Remember me" />
              <Link href="#forgot-password" underline="hover">Forgot password?</Link>
            </Box>
            <Button type="submit" variant="contained" fullWidth className="login-button" disabled={isLoading} endIcon={!isLoading && <ArrowForwardIcon />}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <Typography className="signup-prompt">New to Shiply? <Link href="#sign-up" underline="hover">Create an account</Link></Typography>
          </Box>
        </Box>
      </Paper>
      <Typography className="login-legal">By continuing, you agree to Shiply&apos;s Terms of Service and Privacy Policy.</Typography>
    </Box>
  );
}
export default Login;