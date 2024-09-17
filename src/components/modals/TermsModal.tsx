import { ReactNode } from "react";

export const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-2 text-sm">
      <h1 className="text-2xl font-bold mb-8">プライバシーポリシー</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">お客様から取得する情報</h2>
        <p className="mb-2">当社は、お客様から以下の情報を取得します。</p>
        <ul className="list-disc pl-6">
          <li>氏名(ニックネームやペンネームも含む)</li>
          <li>メールアドレス</li>
          <li>Cookie(クッキー)を用いて生成された識別情報</li>
          <li>
            当社ウェブサイトの滞在時間、入力履歴、購買履歴等の当社ウェブサイトにおけるお客様の行動履歴
          </li>
          <li>
            当社アプリの起動時間、入力履歴、購買履歴等の当社アプリの利用履歴
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          お客様の情報を利用する目的
        </h2>
        <p className="mb-2">
          当社は、お客様から取得した情報を、以下の目的のために利用します。
        </p>
        <ul className="list-disc pl-6">
          <li>当社サービスに関する登録の受付、お客様の本人確認、認証のため</li>
          <li>お客様の当社サービスの利用履歴を管理するため</li>
          <li>お客様からのお問い合わせに対応するため</li>
          <li>当社の規約や法令に違反する行為に対応するため</li>
          <li>当社サービスの変更、提供中止、終了、契約解除をご連絡するため</li>
          <li>当社規約の変更等を通知するため</li>
          <li>以上の他、当社サービスの提供、維持、保護及び改善のため</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          安全管理のために講じた措置
        </h2>
        <p className="mb-2">
          当社が、お客様から取得した情報に関して安全管理のために講じた措置につきましては、末尾記載のお問い合わせ先にご連絡をいただきましたら、法令の定めに従い個別にご回答させていただきます。
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">第三者への提供</h2>
        <p className="mb-2">
          当社は、お客様から取得する情報のうち、個人データ（個人情報保護法第１６条第３項）に該当するものついては、あらかじめお客様の同意を得ずに、第三者（日本国外にある者を含みます。）に提供しません。但し、次の場合は除きます。
        </p>
        <ul className="list-disc pl-6">
          <li>個人データの取扱いを外部に委託する場合</li>
          <li>当社や当社サービスが買収された場合</li>
          <li>
            事業パートナーと共同利用する場合（具体的な共同利用がある場合は、その内容を別途公表します。）
          </li>
          <li>その他、法律によって合法的に第三者提供が許されている場合</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">アクセス解析ツール</h2>
        <p className="mb-2">
          当社は、お客様のアクセス解析のために、「Googleアナリティクス」を利用しています。Googleアナリティクスは、トラフィックデータの収集のためにCookieを使用しています。トラフィックデータは匿名で収集されており、個人を特定するものではありません。Cookieを無効にすれば、これらの情報の収集を拒否することができます。詳しくはお使いのブラウザの設定をご確認ください。Googleアナリティクスについて、詳しくは以下からご確認ください。
        </p>
        <a
          href="https://marketingplatform.google.com/about/analytics/terms/jp/"
          className="text-blue-500 underline w-full"
        >
          Googleアナリティクスについて
        </a>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          プライバシーポリシーの変更
        </h2>
        <p className="mb-2">
          当社は、必要に応じて、このプライバシーポリシーの内容を変更します。この場合、変更後のプライバシーポリシーの施行時期と内容を適切な方法により周知または通知します。
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">お問い合わせ</h2>
        <p className="mb-2">
          お客様の情報の開示、情報の訂正、利用停止、削除をご希望の場合は、以下のメールアドレスにご連絡ください。
        </p>
        <p className="mb-2 flex items-center">
          <span className="material-icons mr-2" style={{ fontSize: "16px" }}>
            mail
          </span>
          contact@sho-horiguchi.jp
        </p>
      </section>

      <section className="mb-6 text-right">
        <p className="mb-2">2024年09月16日 制定</p>
      </section>
    </div>
  );
};

export const TermsModal = ({
  children,
  modalId,
}: {
  children: ReactNode;
  modalId: string;
}) => {
  return (
    <>
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal w-full">
        <div className="modal-box bg-theme bg-opacity-90 border-2 border-blue-300 border-opacity-10 backdrop-blur-sm">
          {children}
          <div className="modal-action">
            <label
              htmlFor={modalId}
              className="btn border-none text-blue-300 font-bold bg-opacity-0"
            >
              確認しました
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
