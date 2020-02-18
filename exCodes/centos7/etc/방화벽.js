let exCodes = {
  section1: {
    systemctl: `/* 방화벽 실행 */
systemctl start firewalld

/* 방화벽 등록 */
systemctl enable firewalld`,
    addPort: `firewall-cmd --zone=public --permanent --add-port=80/tcp`,
    reload: `firewall-cmd --reload`
  }
};

export default exCodes;