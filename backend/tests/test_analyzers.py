import pytest
from backend.analyzers.text_analyzer import text_analyzer
from backend.analyzers.image_analyzer import image_analyzer
from backend.models.schemas import AnalysisDetail, RiskLevel
import io

def test_text_analyzer_authentic():
    text = "The new quarterly earnings report shows a steady 5% growth across all major sectors."
    details, context = text_analyzer.analyze(text)
    
    assert isinstance(details, list)
    assert isinstance(context, dict)
    
    # Authentic text should have no critical AI findings
    critical_findings = [d for d in details if d.severity == RiskLevel.CRITICAL]
    assert len(critical_findings) == 0

def test_text_analyzer_phishing():
    text = "URGENT: Your account will be suspended in 24 hours. Click here to verify your password immediately and win $50,000."
    details, context = text_analyzer.analyze(text)
    
    assert len(details) > 0
    # Phishing should trigger high or critical alerts
    high_critical = [d for d in details if d.severity in (RiskLevel.HIGH, RiskLevel.CRITICAL)]
    assert len(high_critical) > 0

def test_image_analyzer_valid_bytes():
    # Create a dummy valid image (1x1 red pixel PNG)
    dummy_png = b'\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDAT\x08\xd7c\xf8\xcf\xc0\x00\x00\x03\x01\x01\x00\x18\xdd\x8d\xb0\x00\x00\x00\x00IEND\xaeB`\x82'
    
    details, context = image_analyzer.analyze(dummy_png, filename="test.png")
    
    assert isinstance(details, list)
    assert context["format"] in ["PNG", "UNKNOWN"]
    assert context["file_size"] == len(dummy_png)

def test_image_analyzer_corrupt_bytes():
    # Pass random bytes instead of a valid image
    corrupt_data = b'This is not an image at all. Just some random bytes.'
    
    details, context = image_analyzer.analyze(corrupt_data)
    
    # Should handle gracefully without crashing, and flag as anomaly/error
    assert len(details) >= 1
    assert any(d.category == "Structural Anomaly" for d in details)
