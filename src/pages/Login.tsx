import { FormEvent, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
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
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState<"email" | "reset" | "success">("email");
  const [forgotEmail, setForgotEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [isSendingCode, setIsSendingCode] = useState(false);

  const openForgotPassword = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setForgotStep("email");
    setForgotError("");
    setForgotOpen(true);
  };

  const closeForgotPassword = () => {
    if (!isSendingCode) setForgotOpen(false);
  };

  const handleSendCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!forgotEmail) {
      setForgotError("Enter the email address linked to your account.");
      return;
    }

    setForgotError("");
    setIsSendingCode(true);
    window.setTimeout(() => {
      setIsSendingCode(false);
      setForgotStep("reset");
    }, 800);
  };

  const handleResetPassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!verificationCode || newPassword.length < 6 || newPassword !== confirmPassword) {
      setForgotError("Enter the verification code and matching passwords with at least 6 characters.");
      return;
    }

    setForgotError("");
    setForgotStep("success");
  };

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
              <Link href="#forgot-password" underline="hover" onClick={openForgotPassword}>Forgot password?</Link>
            </Box>
            <Button type="submit" variant="contained" fullWidth className="login-button" disabled={isLoading} endIcon={!isLoading && <ArrowForwardIcon />}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <Typography className="signup-prompt">New to Shiply? <Link href="/register" underline="hover">Create an account</Link></Typography>
          </Box>
        </Box>
      </Paper>
      <Typography className="login-legal">By continuing, you agree to Shiply&apos;s Terms of Service and Privacy Policy.</Typography>
      <Dialog open={forgotOpen} onClose={closeForgotPassword} fullWidth maxWidth="xs" className="forgot-dialog">
        {forgotStep === "email" && (
          <Box component="form" onSubmit={handleSendCode} noValidate>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogContent>
              <Typography className="forgot-dialog-copy">Enter your email and we&apos;ll send you a verification code.</Typography>
              {forgotError && <Alert severity="error" className="login-alert">{forgotError}</Alert>}
              <TextField
                label="Email address"
                type="email"
                fullWidth
                required
                autoFocus
                autoComplete="email"
                value={forgotEmail}
                onChange={(event) => setForgotEmail(event.target.value)}
              />
              <Button type="submit" variant="contained" fullWidth className="login-button forgot-dialog-button" disabled={isSendingCode}>
                {isSendingCode ? "Sending code..." : "Send verification code"}
              </Button>
            </DialogContent>
          </Box>
        )}
        {forgotStep === "reset" && (
          <Box component="form" onSubmit={handleResetPassword} noValidate>
            <DialogTitle>Choose a new password</DialogTitle>
            <DialogContent>
              <Typography className="forgot-dialog-copy">We sent a verification code to {forgotEmail}.</Typography>
              {forgotError && <Alert severity="error" className="login-alert">{forgotError}</Alert>}
              <TextField
                label="Verification code"
                fullWidth
                required
                autoFocus
                value={verificationCode}
                onChange={(event) => setVerificationCode(event.target.value)}
              />
              <TextField
                label="New password"
                type={showNewPassword ? "text" : "password"}
                fullWidth
                required
                autoComplete="new-password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                slotProps={{
                  input: {
                    endAdornment: <InputAdornment position="end"><IconButton aria-label={showNewPassword ? "Hide password" : "Show password"} onClick={() => setShowNewPassword(!showNewPassword)} edge="end">{showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton></InputAdornment>,
                  },
                }}
              />
              <TextField
                label="Confirm new password"
                type="password"
                fullWidth
                required
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <Button type="submit" variant="contained" fullWidth className="login-button forgot-dialog-button">Reset password</Button>
            </DialogContent>
          </Box>
        )}
        {forgotStep === "success" && (
          <DialogContent className="forgot-success">
            <Box className="form-icon"><CheckCircleOutlineIcon /></Box>
            <DialogTitle>Password reset complete</DialogTitle>
            <Typography className="forgot-dialog-copy">Your password has been updated. You can now sign in with your new password.</Typography>
            <Button variant="contained" fullWidth className="login-button forgot-dialog-button" onClick={closeForgotPassword}>Return to sign in</Button>
          </DialogContent>
        )}
      </Dialog>
    </Box>
  );
}
export default Login;