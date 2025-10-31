import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render, screen, within } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { SnackbarProvider } from 'notistack';
import { ReactElement } from 'react';

import { server } from '../../setupTests';
import App from '../../App';
import { Event } from '../../types';

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

describe('반복 일정 기능 - 반복 일정 삭제', () => {
  describe('단일 삭제 시나리오 ("예" 클릭)', () => {
    it('반복 일정 삭제 모달에서 "예"를 클릭하면 해당 일정만 삭제된다', () => {
      // Given: 반복 일정이 존재하고 삭제 대화상자가 열림
      // When: "해당 일정만 삭제하시겠어요?" 모달에서 "예" 버튼 클릭
      // Then: 해당 일정만 삭제되고, 나머지 반복 일정은 유지됨
    });

    it('반복 일정의 단일 삭제 후 나머지 반복 일정은 유지된다', () => {
      // Given: 반복 일정 시리즈 (예: 매주 월요일 3주)
      // When: 특정 인스턴스를 단일 삭제("예")
      // Then: 삭제된 일정은 목록에서 제거되고, 나머지 반복 일정은 그대로 유지됨
    });

    it('비반복 일정은 삭제 모달 없이 바로 삭제된다', () => {
      // Given: 비반복 단일 일정이 존재
      // When: 삭제 버튼 클릭
      // Then: 모달 표시 없이 바로 삭제되고, 모달이 나타나지 않음
    });
  });

  describe('전체 삭제 시나리오 ("아니오" 클릭)', () => {
    it('반복 일정 삭제 모달에서 "아니오"를 클릭하면 전체 반복 일정이 삭제된다', () => {
      // Given: 반복 일정이 존재하고 삭제 대화상자가 열림
      // When: "해당 일정만 삭제하시겠어요?" 모달에서 "아니오" 버튼 클릭
      // Then: 반복 일정 시리즈의 모든 일정이 삭제됨
    });

    it('반복 일정을 전체 삭제하면 모든 반복 인스턴스가 제거된다', () => {
      // Given: 반복 일정 시리즈 (예: 매주 월요일 3주, 총 3개)
      // When: 반복 일정 중 하나를 선택해 삭제 모달에서 "아니오" 클릭
      // Then: 해당 시리즈의 3개 일정이 모두 삭제되고, 목록에서 완전히 제거됨
    });
  });

  describe('에러 케이스', () => {
    it('반복 일정 삭제 모달이 표시되지 않으면 단일/전체 삭제 로직이 실행되지 않는다', () => {
      // Given: 비반복 일정이 존재
      // When: 비반복 일정은 모달이 나타나지 않음
      // Then: 삭제 모달의 "예"/"아니오" 버튼이 없음
    });

    it('삭제 후 동일한 일정을 다시 삭제하려고 하면 404 오류를 처리한다', () => {
      // Given: 이미 삭제된 일정의 ID
      // When: 삭제 요청 시도
      // Then: 적절한 에러 메시지 표시 (일정을 찾을 수 없음)
    });
  });
});
