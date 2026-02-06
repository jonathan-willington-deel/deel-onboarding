import { useState } from 'react';
import {
  Button,
  Input,
  Textarea,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Snippet,
} from '@heroui/react';
import { motion } from 'framer-motion';
import type { OnboardingData, TeamMember, ProductTeamMember, CustomTask } from '../types';
import { generateOnboardingUrl } from '../hooks/useOnboardingData';
import { defaultOnboardingData } from '../data/defaultContent';

export function AdminPage() {
  const [formData, setFormData] = useState<OnboardingData>({
    ...defaultOnboardingData,
    teamDesigners: [],
    productTeam: [],
  });

  const [generatedUrl, setGeneratedUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const updateField = <K extends keyof OnboardingData>(field: K, value: OnboardingData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addTeamDesigner = () => {
    setFormData((prev) => ({
      ...prev,
      teamDesigners: [...prev.teamDesigners, { name: '', team: '' }],
    }));
  };

  const updateTeamDesigner = (index: number, field: keyof TeamMember, value: string) => {
    setFormData((prev) => ({
      ...prev,
      teamDesigners: prev.teamDesigners.map((d, i) =>
        i === index ? { ...d, [field]: value } : d
      ),
    }));
  };

  const removeTeamDesigner = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      teamDesigners: prev.teamDesigners.filter((_, i) => i !== index),
    }));
  };

  const addProductTeamMember = () => {
    setFormData((prev) => ({
      ...prev,
      productTeam: [...prev.productTeam, { name: '', role: '' }],
    }));
  };

  const updateProductTeamMember = (index: number, field: keyof ProductTeamMember, value: string) => {
    setFormData((prev) => ({
      ...prev,
      productTeam: prev.productTeam.map((m, i) =>
        i === index ? { ...m, [field]: value } : m
      ),
    }));
  };

  const removeProductTeamMember = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      productTeam: prev.productTeam.filter((_, i) => i !== index),
    }));
  };

  const addCustomTask = () => {
    setFormData((prev) => ({
      ...prev,
      customTasks: [...prev.customTasks, { text: '', link: '' }],
    }));
  };

  const updateCustomTask = (index: number, field: keyof CustomTask, value: string) => {
    setFormData((prev) => ({
      ...prev,
      customTasks: prev.customTasks.map((t, i) =>
        i === index ? { ...t, [field]: value } : t
      ),
    }));
  };

  const removeCustomTask = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      customTasks: prev.customTasks.filter((_, i) => i !== index),
    }));
  };

  const generateLink = () => {
    const url = generateOnboardingUrl(formData);
    setGeneratedUrl(url);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const previewOnboarding = () => {
    const url = generateOnboardingUrl(formData);
    window.open(url, '_blank');
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="header-content">
          <h1>Deel designer onboarding</h1>
          <p>Create personalized onboarding checklists for new designers</p>
        </div>
      </header>

      <main className="admin-main">
        <div className="admin-grid">
          {/* Form Column */}
          <div className="form-column">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="form-card">
                <CardHeader className="card-header">
                  <h2>New joiner details</h2>
                </CardHeader>
                <Divider />
                <CardBody className="card-body">
                  <div className="form-grid">
                    <Input
                      label="Name"
                      labelPlacement="inside"
                      placeholder="Enter new joiner's name"
                      value={formData.name}
                      onValueChange={(v) => updateField('name', v)}
                      variant="bordered"
                      fullWidth
                    />
                    <Input
                      label="Start date"
                      labelPlacement="inside"
                      type="date"
                      value={formData.startDate}
                      onValueChange={(v) => updateField('startDate', v)}
                      variant="bordered"
                      fullWidth
                    />
                    <Input
                      label="Job title"
                      labelPlacement="inside"
                      placeholder="e.g., Product Designer"
                      value={formData.jobTitle}
                      onValueChange={(v) => updateField('jobTitle', v)}
                      variant="bordered"
                      fullWidth
                    />
                    <Input
                      label="Product vertical"
                      labelPlacement="inside"
                      placeholder="e.g., Payroll"
                      value={formData.productVertical}
                      onValueChange={(v) => updateField('productVertical', v)}
                      variant="bordered"
                      fullWidth
                    />
                    <Input
                      label="Design group"
                      labelPlacement="inside"
                      placeholder="e.g., Fintech"
                      value={formData.designGroup}
                      onValueChange={(v) => updateField('designGroup', v)}
                      variant="bordered"
                      fullWidth
                    />
                    <Input
                      label="Line manager"
                      labelPlacement="inside"
                      placeholder="Manager's name"
                      value={formData.lineManager}
                      onValueChange={(v) => updateField('lineManager', v)}
                      variant="bordered"
                      fullWidth
                    />
                    <Input
                      label="Onboarding buddy"
                      labelPlacement="inside"
                      placeholder="Buddy's name"
                      value={formData.onboardingBuddy}
                      onValueChange={(v) => updateField('onboardingBuddy', v)}
                      variant="bordered"
                      className="full-width"
                      fullWidth
                    />
                    <Textarea
                      label="Custom welcome message (optional)"
                      labelPlacement="inside"
                      placeholder="Add a personalized welcome message..."
                      value={formData.customMessage || ''}
                      onValueChange={(v) => updateField('customMessage', v)}
                      variant="bordered"
                      className="full-width"
                      minRows={3}
                      fullWidth
                    />
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="form-card">
                <CardHeader className="card-header">
                  <h2>Designers in their group</h2>
                  <Button
                    size="sm"
                    color="secondary"
                    variant="flat"
                    onPress={addTeamDesigner}
                  >
                    + Add designer
                  </Button>
                </CardHeader>
                <Divider />
                <CardBody className="card-body">
                  {formData.teamDesigners.length === 0 ? (
                    <p className="empty-state">
                      No designers added yet. Click "Add designer" to add team members.
                    </p>
                  ) : (
                    <div className="member-list">
                      {formData.teamDesigners.map((designer, index) => (
                        <div key={index} className="member-row">
                          <Input
                            placeholder="Designer name"
                            value={designer.name}
                            onValueChange={(v) => updateTeamDesigner(index, 'name', v)}
                            variant="bordered"
                            size="sm"
                            fullWidth
                          />
                          <Input
                            placeholder="Team"
                            value={designer.team}
                            onValueChange={(v) => updateTeamDesigner(index, 'team', v)}
                            variant="bordered"
                            size="sm"
                            fullWidth
                          />
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            onPress={() => removeTeamDesigner(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardBody>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="form-card">
                <CardHeader className="card-header">
                  <h2>Product team members</h2>
                  <Button
                    size="sm"
                    color="secondary"
                    variant="flat"
                    onPress={addProductTeamMember}
                  >
                    + Add member
                  </Button>
                </CardHeader>
                <Divider />
                <CardBody className="card-body">
                  {formData.productTeam.length === 0 ? (
                    <p className="empty-state">
                      No team members added yet. Click "Add member" to add product team members.
                    </p>
                  ) : (
                    <div className="member-list">
                      {formData.productTeam.map((member, index) => (
                        <div key={index} className="member-row">
                          <Input
                            placeholder="Member name"
                            value={member.name}
                            onValueChange={(v) => updateProductTeamMember(index, 'name', v)}
                            variant="bordered"
                            size="sm"
                            fullWidth
                          />
                          <Input
                            placeholder="Role (e.g., PM, Tech Lead)"
                            value={member.role}
                            onValueChange={(v) => updateProductTeamMember(index, 'role', v)}
                            variant="bordered"
                            size="sm"
                            fullWidth
                          />
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            onPress={() => removeProductTeamMember(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardBody>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Card className="form-card">
                <CardHeader className="card-header">
                  <h2>Custom tasks</h2>
                  <Button
                    size="sm"
                    color="secondary"
                    variant="flat"
                    onPress={addCustomTask}
                  >
                    + Add task
                  </Button>
                </CardHeader>
                <Divider />
                <CardBody className="card-body">
                  {formData.customTasks.length === 0 ? (
                    <p className="empty-state">
                      No custom tasks added yet. Click "Add task" to add team or role-specific tasks.
                      <br />
                      <span style={{ fontSize: '12px', marginTop: '4px', display: 'inline-block' }}>
                        If no tasks are added, this section will be hidden from the onboarding checklist.
                      </span>
                    </p>
                  ) : (
                    <div className="member-list">
                      {formData.customTasks.map((task, index) => (
                        <div key={index} className="member-row custom-task-row">
                          <Input
                            placeholder="Task description"
                            value={task.text}
                            onValueChange={(v) => updateCustomTask(index, 'text', v)}
                            variant="bordered"
                            size="sm"
                            fullWidth
                          />
                          <Input
                            placeholder="Link (optional)"
                            value={task.link || ''}
                            onValueChange={(v) => updateCustomTask(index, 'link', v)}
                            variant="bordered"
                            size="sm"
                            fullWidth
                          />
                          <Button
                            isIconOnly
                            size="sm"
                            variant="light"
                            color="danger"
                            onPress={() => removeCustomTask(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardBody>
              </Card>
            </motion.div>
          </div>

          {/* Preview Column */}
          <div className="preview-column">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="sticky-preview"
            >
              <Card className="preview-card">
                <CardHeader className="card-header">
                  <h2>Preview and generate</h2>
                </CardHeader>
                <Divider />
                <CardBody className="card-body">
                  <div className="preview-content">
                    <div className="preview-header">
                      <div>
                        <h3>{formData.name || 'New Designer'}</h3>
                        <p>{formData.jobTitle || 'Product Designer'}</p>
                      </div>
                    </div>

                    <div className="preview-details">
                      <div className="detail-row">
                        <span className="detail-label">Start date</span>
                        <span className="detail-value">{formData.startDate || 'Not set'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Vertical</span>
                        <span className="detail-value">{formData.productVertical || 'Not set'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Design group</span>
                        <span className="detail-value">{formData.designGroup || 'Not set'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Line manager</span>
                        <span className="detail-value">{formData.lineManager || 'Not set'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Buddy</span>
                        <span className="detail-value">{formData.onboardingBuddy || 'Not set'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Team designers</span>
                        <span className="detail-value">{formData.teamDesigners.length} added</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Product team</span>
                        <span className="detail-value">{formData.productTeam.length} added</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Custom tasks</span>
                        <span className="detail-value">
                          {formData.customTasks.length > 0
                            ? `${formData.customTasks.length} added`
                            : 'None (section hidden)'}
                        </span>
                      </div>
                    </div>

                    <div className="action-buttons">
                      <Button
                        color="secondary"
                        size="lg"
                        className="generate-btn"
                        onPress={generateLink}
                      >
                        Generate onboarding link
                      </Button>
                      <Button
                        variant="bordered"
                        size="lg"
                        onPress={previewOnboarding}
                      >
                        Preview
                      </Button>
                    </div>

                    {generatedUrl && (
                      <motion.div
                        className="generated-url"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                      >
                        <p className="url-label">Share this link with {formData.name}:</p>
                        <Snippet
                          symbol=""
                          variant="bordered"
                          className="url-snippet"
                        >
                          {generatedUrl}
                        </Snippet>
                        <Button
                          color={copied ? 'success' : 'secondary'}
                          variant="flat"
                          onPress={copyToClipboard}
                          className="copy-btn"
                        >
                          {copied ? 'Copied' : 'Copy link'}
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </CardBody>
              </Card>

              <Card className="info-card">
                <CardBody>
                  <h3>How it works</h3>
                  <ol>
                    <li>Fill in the new joiner's details</li>
                    <li>Add their team designers and product team members</li>
                    <li>Click "Generate onboarding link"</li>
                    <li>Share the link with the new joiner</li>
                  </ol>
                  <p className="note">
                    The link contains all the personalized information encoded in the URL.
                    Progress is saved in the browser's local storage.
                  </p>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>

      </main>

      <style>{`
        .admin-page {
          min-height: 100vh;
          background: #121212;
          color: rgba(255, 255, 255, 0.92);
        }

        .admin-header {
          background: var(--bg-dark);
          padding: 48px 40px;
          color: rgba(255, 255, 255, 0.92);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
        }

        .admin-header h1 {
          font-size: 36px;
          font-weight: 500;
          margin: 0 0 8px 0;
          color: rgba(255, 255, 255, 0.95);
        }

        .admin-header p {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.55);
          margin: 0;
        }

        .admin-main {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px;
        }

        .admin-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 32px;
        }

        .form-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .preview-column {
          position: relative;
        }

        .sticky-preview {
          position: sticky;
          top: 40px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-card, .preview-card, .info-card {
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.92);
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* HeroUI overrides for dark theme */
        .admin-page [data-slot="input-wrapper"] {
          background-color: rgba(255, 255, 255, 0.07) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          box-shadow: none !important;
          color: rgba(255, 255, 255, 0.92) !important;
        }

        .admin-page [data-slot="input-wrapper"]:hover,
        .admin-page [data-slot="input-wrapper"]:focus-within {
          border-color: rgba(255, 255, 255, 0.25) !important;
        }

        .admin-page [data-slot="inner-wrapper"] {
          color: rgba(255, 255, 255, 0.92) !important;
        }

        .admin-page input,
        .admin-page textarea {
          color: rgba(255, 255, 255, 0.92) !important;
          caret-color: var(--color-smoothie) !important;
        }

        .admin-page input::placeholder,
        .admin-page textarea::placeholder {
          color: rgba(255, 255, 255, 0.35) !important;
        }

        .admin-page [data-slot="label"] {
          color: rgba(255, 255, 255, 0.55) !important;
        }

        .admin-page [data-slot="description"] {
          color: rgba(255, 255, 255, 0.4) !important;
        }

        /* HeroUI Card overrides */
        .admin-page .heroui-card,
        .admin-page [data-slot="base"] {
          background: rgba(255, 255, 255, 0.06) !important;
          color: rgba(255, 255, 255, 0.92) !important;
        }

        /* HeroUI Divider */
        .admin-page hr,
        .admin-page [role="separator"] {
          border-color: rgba(255, 255, 255, 0.08) !important;
          background: rgba(255, 255, 255, 0.08) !important;
        }

        /* HeroUI Snippet */
        .admin-page .url-snippet {
          background: rgba(255, 255, 255, 0.05) !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
          color: rgba(255, 255, 255, 0.85) !important;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
        }

        .card-header h2 {
          font-size: 18px;
          font-weight: 500;
          margin: 0;
          color: rgba(255, 255, 255, 0.92);
        }

        .card-body {
          padding: 24px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        .empty-state {
          text-align: center;
          color: rgba(255, 255, 255, 0.45);
          padding: 20px;
        }

        .member-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .member-row {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 12px;
          align-items: center;
        }

        .preview-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .preview-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .preview-header h3 {
          font-size: 24px;
          font-weight: 500;
          margin: 0;
          color: rgba(255, 255, 255, 0.95);
        }

        .preview-header p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          margin: 4px 0 0 0;
        }

        .preview-details {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .detail-row:last-child {
          border-bottom: none;
        }

        .detail-label {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
        }

        .detail-value {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
        }

        .action-buttons {
          display: flex;
          gap: 12px;
        }

        .generate-btn {
          flex: 1;
        }

        .generated-url {
          background: linear-gradient(135deg, rgba(92, 45, 145, 0.2) 0%, rgba(26, 10, 92, 0.2) 100%);
          border-radius: 12px;
          padding: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .url-label {
          font-size: 13px;
          font-weight: 500;
          margin: 0 0 12px 0;
          color: rgba(255, 255, 255, 0.85);
        }

        .url-snippet {
          margin-bottom: 12px;
          word-break: break-all;
        }

        .copy-btn {
          width: 100%;
        }

        .info-card h3 {
          font-size: 16px;
          font-weight: 500;
          margin: 0 0 16px 0;
          color: rgba(255, 255, 255, 0.92);
        }

        .info-card ol {
          padding-left: 20px;
          margin: 0 0 16px 0;
        }

        .info-card li {
          margin-bottom: 8px;
          color: rgba(255, 255, 255, 0.55);
        }

        .info-card .note {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.05);
          padding: 12px;
          border-radius: 8px;
          margin: 0;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 1024px) {
          .admin-grid {
            grid-template-columns: 1fr;
          }

          .sticky-preview {
            position: static;
          }
        }
      `}</style>
    </div>
  );
}
