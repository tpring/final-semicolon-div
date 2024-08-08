'use client';
import React from 'react';
import Link from 'next/link';

const PrivacyPage = () => {
  return (
    <div className="max-w-max mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">LEGAL</h1>
      <div className="flex justify-center mb-8">
        <Link
          href="/legal/terms"
          className="px-4 py-2 mr-4 rounded-lg bg-neutral-100 text-gray-800 cursor-pointer transition"
        >
          통합 서비스 이용약관
        </Link>
        <Link href="/legal/privacy" className="px-4 py-2 rounded-lg bg-main-400 text-white cursor-pointer transition">
          개인정보 처리방침
        </Link>
      </div>
      <div className="max-w-max mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-8 text-center">개인정보 처리방침</h1>

        <div className="flex justify-between items-center text-gray-600 mb-6">
          <span>마지막 업데이트 2024.08.07</span>
          <div>
            <span className="mr-4">공고: 2024년 8월 7일</span>
            <span>시행: 2024년 8월 7일</span>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-8 leading-7 text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">1. 개인정보 처리방침의 의미</h2>
          <p className="mb-6">
            “개인정보 처리방침”은 이용자가 안심하고 서비스를 이용할 수 있도록 회사가 준수해야 할 지침을 의미하며, div는
            개인정보처리자가 준수하여야 하는 대한민국의 관계 법령 및 개인정보보호 규정, 가이드라인을 준수하여 개인정보
            처리방침을 제공합니다.
          </p>

          <p className="mb-6">
            div는 이용자의 동의를 기반으로 개인정보를 수집·이용 및 제공하고 있으며 이용자의 권리(개인정보 자기결정권)를
            적극적으로 보장하기 위해 개인정보 처리방침을 알기 쉽게 제공할 수 있도록 다양한 노력을 기울이고 있습니다.
          </p>

          <h2 className="text-2xl font-semibold mb-4">2. 개인정보 수집과 회원가입</h2>
          <p className="mb-6">
            div 이용자는 회원가입을 하지 않아도 대부분의 div 서비스를 회원과 동일하게 이용할 수 있습니다.
          </p>

          <p className="mb-6">
            이용자가 컨텐츠를 게시하거나 이용하는 등의 목적으로 회원가입을 할 경우, div는 서비스 제공을 위해 필요한
            최소한의 개인정보를 수집합니다.
          </p>

          <h2 className="text-2xl font-semibold mb-4">3. 수집하는 개인정보의 종류</h2>
          <p className="mb-6">서비스 제공을 위해 수집하는 개인정보는 아래와 같습니다.</p>

          <ul className="mb-6 list-disc list-inside">
            <li>회원정보 또는 개별 서비스에서 프로필 정보(별명, 프로필 사진)를 설정할 수 있습니다.</li>
            <li>
              추가로 개인정보를 수집이 필요한 경우에는 해당 개인정보 수집 시점에서 이용자에게 ‘수집하는 개인정보 항목,
              개인정보의 수집 및 이용목적, 개인정보의 보관기간’에 대해 안내 드리고 동의를 받습니다.
            </li>
            <li>
              이용자 동의 후 개인정보를 추가 수집하는 경우, 서비스 이용 과정에서 IP 주소, 쿠키, 서비스 이용 기록,
              기기정보가 수집될 수 있습니다.
            </li>
          </ul>

          <p className="mb-6">div는 아래의 방법을 통해 개인정보를 수집합니다.</p>

          <ul className="mb-6 list-disc list-inside">
            <li>
              회원가입 및 서비스 이용 과정에서 이용자가 개인정보 수집에 대해 동의를 하고 직접 정보를 입력하는 경우, 해당
              개인정보를 수집합니다.
            </li>
            <li>오프라인에서 진행되는 이벤트, 세미나 등에서 서면을 통해 개인정보가 수집될 수 있습니다.</li>
            <li>
              div와 제휴한 외부 기업이나 단체로부터 개인정보를 제공받거나 제공할 수 있으며, 이러한 경우에는
              개인정보보호법에서 요구하는 동의 등의 절차를 거치게 됩니다.
            </li>
            <li>기기정보와 같은 생성정보는 PC웹, 모바일 웹/앱 이용 과정에서 자동으로 생성되어 수집될 수 있습니다.</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">4. 수집하는 개인정보 세부 내역</h2>
          <p className="mb-6">
            <strong>회원가입 시 수집</strong>
          </p>

          <ul className="mb-6 list-disc list-inside">
            <li>
              <strong>일반 가입:</strong> 로그인 아이디, 비밀번호, 이름, 이메일, 접속 IP 정보, 쿠키, 서비스 이용 기록,
              접속 로그
            </li>
            <li>
              <strong>소셜회원 가입:</strong>
              <ul className="list-inside list-disc pl-6">
                <li>카카오: 프로필 이미지(선택 사항), 이메일, 이름</li>
                <li>구글: 프로필 이미지(선택 사항), 이메일, 이름</li>
                <li>GitHub: 프로필 이미지(선택 사항), 이메일</li>
              </ul>
            </li>
          </ul>
          <p className="mb-6">
            <strong>서비스 이용과정이나 사업처리 과정에서 자동 수집</strong>
          </p>
          <ul className="mb-6 list-disc list-inside">
            <li>IP Address, 쿠키, 방문 일시, 서비스 이용 기록, 불량 이용 기록, 광고 아이디, 접속 환경</li>
          </ul>
          <h2 className="text-2xl font-semibold mb-4">4. 개인정보 이용 목적</h2>
          <p className="mb-6">
            div는 회원관리, 서비스 개발·제공 및 향상, 안전한 인터넷 이용환경 구축 등 아래의 목적으로만 개인정보를
            이용합니다.
          </p>
          <ul className="mb-6 list-disc list-inside">
            <li>
              회원 가입 의사의 확인, 연령 확인 및 법정대리인 동의 진행, 이용자 및 법정대리인의 본인 확인, 이용자 식별,
              회원탈퇴 의사의 확인 등 회원관리를 위하여 개인정보를 이용합니다.
            </li>
            <li>
              콘텐츠 등 기존 서비스 제공(광고 포함)에 더하여 신규 서비스 요소의 발굴 및 기존 서비스 개선 등을 위하여
              개인정보를 이용합니다.
            </li>
            <li>
              법령 및 약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에
              지장을 주는 행위에 대한 방지 및 제재, 계정도용 및 부정거래 방지, 약관 개정 등의 고지사항 전달, 분쟁조정을
              위한 기록 보존, 민원처리 등 이용자 보호 및 서비스 운영을 위하여 개인정보를 이용합니다.
            </li>
            <li>
              유료 서비스 제공에 따르는 본인인증, 구매 및 요금 결제, 상품 및 서비스의 배송을 위하여 개인정보를
              이용합니다.
            </li>
            <li>
              이벤트 정보 및 참여기회 제공, 광고성 정보 제공 등 마케팅 및 프로모션 목적으로 개인정보를 이용합니다.
              서비스 이용기록과 접속 빈도 분석, 서비스 이용에 대한 통계, 서비스 분석 및 통계에 따른 맞춤 서비스 제공 및
              광고 게재 등에 개인정보를 이용합니다.
            </li>
            <li>
              보안, 프라이버시, 안전 측면에서 이용자가 안심하고 이용할 수 있는 서비스 이용환경 구축을 위해 개인정보를
              이용합니다.
            </li>
            <li>
              div는 수집한 개인정보를 특정 개인을 알아볼 수 없도록 가명처리하여 통계작성, 과학적 연구, 공익적 기록 보존
              등을 위하여 처리할 수 있습니다. 이 때 가명정보는 재식별되지 않도록 추가정보와 분리하여 별도 저장·관리하고
              필요한 기술적·관리적 보호조치를 취합니다.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">5. 개인정보 제공 및 위탁</h2>
          <p className="mb-6">
            div는 이용자의 사전 동의 없이 개인정보를 외부에 제공하지 않습니다. 단, 이용자가 외부 제휴사의 서비스를
            이용하기 위하여 개인정보 제공에 직접 동의를 한 경우, 그리고 관련 법령에 의거해 div에 개인정보 제출 의무가
            발생한 경우, 이용자의 생명이나 안전에 급박한 위험이 확인되어 이를 해소하기 위한 경우에 한하여 개인정보를
            제공하고 있습니다.
          </p>

          <p className="mb-6">div는 편리하고 더 나은 서비스를 제공하기 위해 업무 중 일부를 외부에 위탁하고 있습니다.</p>

          <p className="mb-6">
            div는 서비스 제공을 위하여 필요한 업무 중 일부를 외부 업체에 위탁하고 있으며, 위탁받은 업체가
            개인정보보호법에 따라 개인정보를 안전하게 처리하도록 필요한 사항을 규정하고 관리/감독을 하고 있습니다.
          </p>

          <p className="mb-6">
            div가 수탁업체에 위탁하는 업무와 관련된 서비스를 이용하지 않는 경우, 이용자의 개인정보가 수탁업체에 제공되지
            않습니다.
          </p>

          <p className="mb-6">
            <strong>이용자 동의 후 개인정보 제공이 발생하는 경우</strong>
          </p>

          <h2 className="text-2xl font-semibold mb-4">6. 개인정보의 보관 및 파기</h2>
          <p className="mb-6">회사는 이용자의 개인정보를 회원 탈퇴 또는 이용목적 달성 시 지체없이 파기하고 있습니다.</p>

          <p className="mb-6">
            단, 회원에게 개인정보 보관기간에 대해 별도의 동의를 얻은 경우, 또는 법령에서 일정 기간 정보보관 의무를
            부과하는 경우에는 해당 기간 동안 개인정보를 안전하게 보관합니다.
          </p>

          <p className="mb-6">
            <strong>내부 방침에 의한 보관</strong>
          </p>
          <ul className="mb-6 list-disc list-inside">
            <li>부정이용기록은 부정 이용 방지를 위해 1년간 보관됩니다.</li>
          </ul>

          <p className="mb-6">
            <strong>관련 법령에 의한 보관</strong>
          </p>
          <ul className="mb-6 list-disc list-inside">
            <li>방문에 관한 기록 보유: 3개월 (통신비밀보호법)</li>
          </ul>

          <p className="mb-6">
            개인정보가 삭제되더라도 업로드한 정보, 질문, 답변은 사이트에 남아있게 되며, 작성자는 익명화되어 나중에
            사이트를 다시 방문하더라도 작성자가 누구인지 식별되지 않습니다. 개인정보가 삭제된 후에는 작성자가 누구인지
            특정하기 어려우므로, 작성자의 권한에 의한 삭제는 불가능합니다. 따라서, 컨텐츠와 개인정보를 모두 삭제하기
            원하는 경우에는 컨텐츠 삭제 처리를 완료한 후 회원탈퇴를 진행하셔야 합니다.
          </p>
          <h2 className="text-2xl font-semibold mb-4">7. 개인정보 보호와 회원의 책임</h2>
          <p className="mb-6">
            회원은 개인정보를 보호받을 권리와 함께 스스로를 보호하고 타인의 정보를 침해하지 않을 의무도 가지고 있습니다.
            비밀번호를 포함한 회원의 개인정보가 유출되지 않도록 조심하시고 게시물을 포함한 타인의 개인정보를 훼손하지
            않도록 유의해 주십시오.
          </p>

          <p className="mb-6">
            회원이 입력한 부정확한 정보로 인해 발생하는 사고의 책임은 회원 자신에게 있습니다. 회원은 개인정보를 최신의
            상태로 정확하게 입력하여 불의의 사고를 예방하여야 할 의무가 있습니다.
          </p>

          <p className="mb-6">
            회원이 위 책임을 다하지 못하고 타인의 정보 및 존엄성을 훼손할 시에는 『개인정보 보호법』, 『정보통신망
            이용촉진 및 정보보호 등에 관한 법률』 등 관련 법률에 의해 처벌받을 수 있습니다.
          </p>

          <ul className="mb-6 list-decimal list-inside pl-4">
            <li>
              회원은 언제든지 div 로그인 후, 로그인 아이디를 제외한 자신의 개인정보를 조회하거나 수정할 수 있습니다.
            </li>
            <li>회원은 언제든지 회원 탈퇴 등을 통해 개인정보의 수집 및 이용 동의를 철회할 수 있습니다.</li>
            <li>
              회원이 개인정보의 오류에 대한 정정을 요청한 경우, 정정을 완료하기 전까지 해당 개인정보를 이용 또는
              제공하지 않습니다. 또한 잘못된 개인정보를 제3자에게 이미 제공한 경우에는 정정 처리결과를 제3자에게
              지체없이 통지하여 정정이 이루어지도록 하겠습니다.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
