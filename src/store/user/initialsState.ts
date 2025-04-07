type userType = {
  user: [] | null;
  status?: string;
  error?: string | null;
};

export const initialState: userType = {
  user: null,
  status: '',
  error: null,
};
