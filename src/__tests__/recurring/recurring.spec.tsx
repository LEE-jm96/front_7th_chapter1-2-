import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { SnackbarProvider } from 'notistack';
import { ReactElement } from 'react';

import App from '../../App';

const theme = createTheme();

const setup = (element: ReactElement) => {
    const user = userEvent.setup();
  
    return {
        ...render(
            <ThemeProvider theme={theme}>
            <CssBaseline />
                <SnackbarProvider>{element}</SnackbarProvider>
            </ThemeProvider>
        ),
      user,
    };
};

describe('반복 일정 기능 - 반복 유형 선택', () => {
  it('일정 생성, 수정 시 반복 유형을 선택할 수 있다', async () => {

  });
});

